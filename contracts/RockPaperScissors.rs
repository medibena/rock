use anchor_lang::prelude::*;
use anchor_lang::solana_program::system_program;

declare_id!("RPSGame1111111111111111111111111111111111");

#[program]
pub mod rock_paper_scissors {
    use super::*;

    pub fn create_game(
        ctx: Context<CreateGame>,
        wager_amount: u64,
        player_move: u8,
    ) -> Result<()> {
        let game = &mut ctx.accounts.game;
        let player = &ctx.accounts.player;

        game.player1 = player.key();
        game.player2 = Pubkey::default();
        game.wager_amount = wager_amount;
        game.player1_move = player_move;
        game.player2_move = 0;
        game.winner = Pubkey::default();
        game.game_state = GameState::WaitingForPlayer2;
        game.created_at = Clock::get()?.unix_timestamp;

        // Transfer wager to game account
        let transfer_instruction = anchor_lang::solana_program::system_instruction::transfer(
            &player.key(),
            &game.key(),
            wager_amount,
        );

        anchor_lang::solana_program::program::invoke(
            &transfer_instruction,
            &[
                player.to_account_info(),
                game.to_account_info(),
                ctx.accounts.system_program.to_account_info(),
            ],
        )?;

        Ok(())
    }

    pub fn join_game(
        ctx: Context<JoinGame>,
        player_move: u8,
    ) -> Result<()> {
        let game = &mut ctx.accounts.game;
        let player = &ctx.accounts.player;

        require!(game.game_state == GameState::WaitingForPlayer2, ErrorCode::GameNotAvailable);
        require!(game.player1 != player.key(), ErrorCode::CannotPlayAgainstSelf);

        game.player2 = player.key();
        game.player2_move = player_move;
        game.game_state = GameState::InProgress;

        // Transfer wager to game account
        let transfer_instruction = anchor_lang::solana_program::system_instruction::transfer(
            &player.key(),
            &game.key(),
            game.wager_amount,
        );

        anchor_lang::solana_program::program::invoke(
            &transfer_instruction,
            &[
                player.to_account_info(),
                game.to_account_info(),
                ctx.accounts.system_program.to_account_info(),
            ],
        )?;

        Ok(())
    }

    pub fn reveal_and_settle(ctx: Context<RevealAndSettle>) -> Result<()> {
        let game = &mut ctx.accounts.game;

        require!(game.game_state == GameState::InProgress, ErrorCode::GameNotInProgress);

        let winner = determine_winner(game.player1_move, game.player2_move);
        let total_pot = game.wager_amount * 2;

        match winner {
            GameResult::Player1Wins => {
                game.winner = game.player1;
                // Transfer pot to player1
                **game.to_account_info().try_borrow_mut_lamports()? -= total_pot;
                **ctx.accounts.player1.try_borrow_mut_lamports()? += total_pot;
            },
            GameResult::Player2Wins => {
                game.winner = game.player2;
                // Transfer pot to player2
                **game.to_account_info().try_borrow_mut_lamports()? -= total_pot;
                **ctx.accounts.player2.try_borrow_mut_lamports()? += total_pot;
            },
            GameResult::Tie => {
                // Return wagers to both players
                **game.to_account_info().try_borrow_mut_lamports()? -= total_pot;
                **ctx.accounts.player1.try_borrow_mut_lamports()? += game.wager_amount;
                **ctx.accounts.player2.try_borrow_mut_lamports()? += game.wager_amount;
            }
        }

        game.game_state = GameState::Finished;
        Ok(())
    }
}

fn determine_winner(move1: u8, move2: u8) -> GameResult {
    match (move1, move2) {
        (1, 3) | (2, 1) | (3, 2) => GameResult::Player1Wins, // Rock beats Scissors, Paper beats Rock, Scissors beats Paper
        (3, 1) | (1, 2) | (2, 3) => GameResult::Player2Wins,
        _ => GameResult::Tie,
    }
}

#[derive(Accounts)]
pub struct CreateGame<'info> {
    #[account(
        init,
        payer = player,
        space = 8 + 32 + 32 + 8 + 1 + 1 + 32 + 1 + 8,
        seeds = [b"game", player.key().as_ref()],
        bump
    )]
    pub game: Account<'info, Game>,
    #[account(mut)]
    pub player: Signer<'info>,
    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
pub struct JoinGame<'info> {
    #[account(mut)]
    pub game: Account<'info, Game>,
    #[account(mut)]
    pub player: Signer<'info>,
    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
pub struct RevealAndSettle<'info> {
    #[account(mut)]
    pub game: Account<'info, Game>,
    #[account(mut)]
    pub player1: AccountInfo<'info>,
    #[account(mut)]
    pub player2: AccountInfo<'info>,
}

#[account]
pub struct Game {
    pub player1: Pubkey,
    pub player2: Pubkey,
    pub wager_amount: u64,
    pub player1_move: u8, // 1 = Rock, 2 = Paper, 3 = Scissors
    pub player2_move: u8,
    pub winner: Pubkey,
    pub game_state: GameState,
    pub created_at: i64,
}

#[derive(AnchorSerialize, AnchorDeserialize, Clone, PartialEq)]
pub enum GameState {
    WaitingForPlayer2,
    InProgress,
    Finished,
}

pub enum GameResult {
    Player1Wins,
    Player2Wins,
    Tie,
}

#[error_code]
pub enum ErrorCode {
    #[msg("Game is not available for joining")]
    GameNotAvailable,
    #[msg("Cannot play against yourself")]
    CannotPlayAgainstSelf,
    #[msg("Game is not in progress")]
    GameNotInProgress,
}
