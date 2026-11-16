pub fn game_title() -> &'static str {
    "TUIwer Defense"
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn title_is_tuiwer_defense() {
        assert_eq!(game_title(), "TUIwer Defense");
    }
}
