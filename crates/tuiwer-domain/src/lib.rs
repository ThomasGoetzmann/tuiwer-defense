pub const STARTING_GOLD: u32 = 100;
pub const STARTING_LIVES: u32 = 20;

pub fn game_title() -> &'static str {
    "TUIwer Defense"
}

pub fn damage_after_armor(damage: u32, armor: u32) -> u32 {
    if damage == 0 {
        return 0; // example: slowing towers
    }

    let minimal_damage = 1;
    damage.saturating_sub(armor).max(minimal_damage)
}

pub fn lives_after_leak(lives: u32, leaked: u32) -> u32 {
    lives.saturating_sub(leaked)
}

pub fn gold_after_reward(gold: u32, reward: u32) -> u32 {
    // Gold is capped: player is rich enough at u32::MAX
    gold.saturating_add(reward)
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn title_is_tuiwer_defense() {
        assert_eq!(game_title(), "TUIwer Defense");
    }

    #[test]
    fn armor_reduces_damage() {
        assert_eq!(damage_after_armor(10, 3), 7);
    }

    #[test]
    fn zero_armor_keeps_damage() {
        assert_eq!(damage_after_armor(4, 0), 4);
    }

    #[test]
    fn damage_after_armor_always_does_min_one_damage() {
        assert_eq!(damage_after_armor(2, 5), 1); // damage is lower than armor
    }

    #[test]
    fn damage_after_armor_is_zero_only_if_damage_is_zero() {
        assert_eq!(damage_after_armor(0, 0), 0); // no damage, even there is no armor. Example: 'slow' towers
    }

    #[test]
    fn lives_after_leak_subtracts() {
        assert_eq!(lives_after_leak(20, 5), 15);
    }

    #[test]
    fn lives_after_leak_never_goes_below_zero() {
        assert_eq!(lives_after_leak(20, 21), 0);
    }

    #[test]
    fn gold_after_reward_adds() {
        assert_eq!(gold_after_reward(10, 3), 13);
    }

    #[test]
    fn gold_after_reward_is_capped() {
        assert_eq!(gold_after_reward(u32::MAX, 1), u32::MAX);
    }

    #[test]
    fn starting_values() {
        assert_eq!(STARTING_GOLD, 100);
        assert_eq!(STARTING_LIVES, 20);
    }
}
