
use wasm_bindgen::prelude::*;

// Chords are represented by vectors of pitches 
// and\or absolute intervals from the tonic
pub fn match_chord(quality: &str) -> Vec<u16> {
    match quality {
        "maj" => vec![0,4,7],
        "min" => vec![0,3,7],
        "dim" => vec![0,3,6],
        "aug" => vec![0,4,8],
        "sus2" => vec![0,2,7],
        "sus4" => vec![0,5,7],
        "maj7" => vec![0,4,7,11],
        "m7" => vec![0,3,7,10],
        "7" => vec![0,4,7,10],
        "dim7" => vec![0,3,6,9],
        "m7b5" => vec![0,3,6,10],
        "mMaj7" => vec![0,3,7,11],
        "maj6" => vec![0,4,7,9],
        "min6" => vec![0,3,7,9],
        "6/9" => vec![0,4,7,9,14],
        "9" => vec![0,4,7,10,14],
        "maj9" => vec![0,4,7,11,14],
        "min9" => vec![0,3,7,10,14],
        "11" => vec![0,4,7,10,14,17],
        "maj11" => vec![0,4,7,11,14,17],
        "min11" => vec![0,3,7,10,14,17],
        _ => vec![]
    }
}

// Circular Index
pub fn ci(i: usize, len: usize) -> usize {
    i.rem_euclid(len)
}

#[wasm_bindgen]
pub fn fibonnaci(n: u32) -> u32 {
    if n == 0 {
        return 0;
    }
    if n == 1 {
        return 1;
    }
    fibonnaci(n - 1) + fibonnaci(n - 2)
}

#[wasm_bindgen]
pub fn get_scalenum(notes_on: Vec<u8>) -> u16 {
    let mut scalenum: u16 = 0;
    for (i, &note) in notes_on.iter().enumerate() {
        if note != 0 {
            scalenum |= 1 << i;
        }
    }
    scalenum
}

#[wasm_bindgen]
//Each scale is identified by a unique 12-digit binary number where each
// digit corresponds to that note being in the scale. 
pub fn get_scalename(scalenum: u16) -> String {
    match scalenum {
        // Intervals
        0b0000_0000_0001 => String::from("Unison"),
        0b0000_0000_0011 => String::from("Minor Second"),
        0b0000_0000_0101 => String::from("Major Second"),
        0b0000_0000_1001 => String::from("Minor Third"),
        0b0000_0001_0001 => String::from("Major Third"),
        0b0000_0010_0001 => String::from("Perfect Fourth"),
        0b0000_0100_0001 => String::from("Tritone"),
        0b0000_1000_0001 => String::from("Perfect Fifth"),
        0b0001_0000_0001 => String::from("Minor Sixth"),
        0b0010_0000_0001 => String::from("Major Sixth"),
        0b0100_0000_0001 => String::from("Minor Seventh"),
        0b1000_0000_0001 => String::from("Major Seventh"),

        // Triads 
        0b0000_1001_0001 => String::from("Major Triad"),
        0b0000_1000_1001 => String::from("Minor Triad"),
        0b0000_0100_1001 => String::from("Diminished Triad"),
        0b0001_0001_0001 => String::from("Augmented Triad"),
        0b0000_1000_0101 => String::from("Suspended 2"),
        0b0000_1010_0001 => String::from("Suspended 4"),

        //Larger Chords 
        0b1000_1001_0001 => String::from("Major 7"),
        0b0100_1000_1001 => String::from("Minor 7"),
        0b0010_1001_0001 => String::from("Major 6"),
        0b0100_1001_0001 => String::from("Dominant 7"),
        0b0010_0100_1001 => String::from("Dimished 7"),
        0b0100_0100_1001 => String::from("Minor 7 b5"),
        0b0010_1000_1001 => String::from("Minor 6"),
        0b1000_1000_1001 => String::from("Minor-Major 7"),

        0b1000_1001_0101 => String::from("Major 9"),
        0b0100_1000_1101 => String::from("Minor 9"),

        0b1000_1011_0101 => String::from("Major 11"),
        0b0100_1010_1101 => String::from("Minor 11"),
        0b0100_1011_0101 => String::from("Dominant 11"),

        // Non-Diatonic Modes
        0b1111_1111_1111 => String::from("Chromatic"),
        0b0101_0101_0101 => String::from("Whole Tone"),
        0b1011_0110_1101 => String::from("Whole Half"),

        // Major Modes
        0b1010_1011_0101 => String::from("Major"), 
        0b0110_1010_1101 => String::from("Dorian"),
        0b0101_1010_1011 => String::from("Phrygian"),
        0b1010_1101_0101 => String::from("Lydian"),
        0b0110_1011_0101 => String::from("Mixolydian"),
        0b0101_1010_1101 => String::from("Minor"),
        0b0101_0110_1011 => String::from("Locrian"),

        // Melodic Minor Modes
        0b1010_1010_1101 => String::from("Melodic Minor"),
        0b0110_1010_1011 => String::from("Dorian b2"),
        0b1011_0101_0101 => String::from("Lydian Augmented"),
        0b0110_1101_0101 => String::from("Acoustic"),
        0b0101_1011_0101 => String::from("Major-Minor"),
        0b0101_0110_1101 => String::from("Minor Locrian"),
        0b0101_0101_1011 => String::from("Super Locrian"),

        // Pentatonic Modes
        0b0010_1001_0101 => String::from("Major Pentatonic"), // 6/9
        0b0100_1010_1001 => String::from("Minor Pentatonic"),
        0b0100_1010_0101 => String::from("Suspended Pentatonic"),
        0b0101_0010_1001 => String::from("Blues Pentatonic"),
        0b0010_1010_0101 => String::from("Scottish Pentatonic"),

        0b0100_1001_0101 => String::from("Dominant Pentatonic"),


        // Blues Hexatatonic
        0b0010_1001_1101 => String::from("Major Blues"),
        0b0100_1010_0111 => String::from("Pyrimic"),
        0b1010_0101_0011 => String::from("Raga"),

        //Misc
        0b0000_0000_0000 => String::from("The Un-Scale"),
        _ if scalenum & 0b1 == 0 => String::from("Not a Scale"),
        _ => String::from("Unknown Scale"),
    }
}

#[wasm_bindgen]
pub fn build_pitchclassset(scalenum: u16) -> Vec<u16> {
    let binary_string = format!("{:016b}", scalenum);
    let pitchclassset: Vec<u16> = binary_string
        .chars()
        .rev()
        .enumerate()
        .filter(|(_, c)| *c == '1')
        .map(|(i, _)| i as u16)
        .collect();

    pitchclassset
}

#[wasm_bindgen]
pub fn build_intervals(pitchclassset: Vec<u16>) -> Vec<u16> {
    let intervals: Vec<u16> = pitchclassset
        .iter()
        .zip(pitchclassset.iter().skip(1))
        .map(|(a, b)| b - a)
        .chain(std::iter::once(12 - pitchclassset.last().unwrap()))
        .collect();

    intervals
}

#[wasm_bindgen]
// Chords are encoded in hexadecimal. Each note corresponds to a value 0-b (0-11).
// Each note in the chord corresponds to a digit in the final number read right to left. 
// A leading 0xE is added to the front of each chord to keep a chord ending in C=0 
// from being indistinguishable another chord without the final C=0.
// Ex: 0xE740 = [0,4,7] = Cmaj. 0xE0851 = [1,5,8,0] = Dbmaj7 != 0xE851 = [1,5,8] = Dbmaj.
pub fn get_chord_in_scale(quality: &str, tonic: u16, pitchclassset: Vec<u16>) -> Vec<u32> {
    let chord_ivals = match_chord(quality);

    let pitchclassset_shifted = pitchclassset.iter().map(|x| (x + tonic).rem_euclid(12)).collect::<Vec<u16>>();

    pitchclassset_shifted.iter()
        .map(|pitch| { chord_ivals.iter()
            .map(|chord_ival| {
                    let chordpitch = (pitch + chord_ival).rem_euclid(12);
                    if pitchclassset_shifted.contains(&chordpitch) {
                        chordpitch
                    // If the chord is not in the scale return 0xD=14
                    // This value ~~should NEVER be returned~~ as a chordpitch
                    } else {
                        0xD
                    }
                }
            ).map(|x| format!("{:x}", x))
            .rev()
            .collect::<String>()
    }).filter(|x| !x.contains('d')) //Filter out anything that is not in the scale
    .map(|x| u32::from_str_radix(&format!("e{}", x), 16).unwrap())
    .collect()
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_get_chord_in_scale_aug() {
        let tonic = 0; // C 
        let pitchclassset = vec![0, 4, 8];
        let quality = "aug";
        let expected_chord_in_scale = vec![0xE840, 0xE084, 0xE408];
        assert_eq!(get_chord_in_scale(quality, tonic, pitchclassset), expected_chord_in_scale);
    }
    
    #[test]
    fn test_get_chord_in_scale_aug_diff_tonic() {
        let tonic = 4; // E
        let pitchclassset = vec![0, 4, 8];
        let quality = "aug";
        let expected_chord_in_scale = vec![0xE084, 0xE408, 0xE840];
        assert_eq!(get_chord_in_scale(quality, tonic, pitchclassset), expected_chord_in_scale);
    }

    #[test]
    fn test_get_chord_in_scale_maj() {

        //major chord ivals = [0,4,7]

        let tonic = 0; // C
        let pitchclassset = vec![0,2,4,5,7,9,11];
        let quality = "maj";
        let expected_chord_in_scale = vec![0xE740, 0xE095, 0xE2b7];
        assert_eq!(get_chord_in_scale(quality, tonic, pitchclassset), expected_chord_in_scale);
    }

    #[test]
    fn test_get_chord_in_scale_maj_diff_tonic() {

        //major chord ivals = [0,4,7]

        let tonic = 6; // F#
        let pitchclassset = vec![0,2,4,5,7,9,11];
        let quality = "maj";
        let expected_chord_in_scale = vec![0xE1a6, 0xE63b, 0xE851];
        assert_eq!(get_chord_in_scale(quality, tonic, pitchclassset), expected_chord_in_scale);
    }


    #[test]
    fn test_chord_in_scale_min7() {

        let tonic = 0; // C
        let pitchclassset = vec![0,1,3,5,7,8,10];
        let quality = "m7";
        let expected_chord_in_scale = vec![0xEa730, 0xE3085, 0xE851a];
        assert_eq!(get_chord_in_scale(quality, tonic, pitchclassset), expected_chord_in_scale);

    }


    #[test]
    fn test_chord_in_scale_min7_diff_tonic() {

        let tonic = 4; // E
        let pitchclassset = vec![0,1,3,5,7,8,10];
        let quality = "m7";
        let expected_chord_in_scale = vec![0xE2b74, 0xE7409, 0xE0952];
        assert_eq!(get_chord_in_scale(quality, tonic, pitchclassset), expected_chord_in_scale);

    }

    #[test]
    fn test_chord_in_scale_min11() {

        let tonic = 9; // A
        let pitchclassset = vec![0,2,3,5,7,9,10];
        let quality = "min11";
        let expected_chord_in_scale = vec![0xE2b7409, 0xE962b74];
        assert_eq!(get_chord_in_scale(quality, tonic, pitchclassset), expected_chord_in_scale);

    }

    #[test]
    fn test_get_scalenum() {
        let notes_off = vec![0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
        assert_eq!(get_scalenum(notes_off), 0);

        let notes_on = vec![1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
        assert_eq!(get_scalenum(notes_on), 1);

        let notes_on = vec![1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0];
        assert_eq!(get_scalenum(notes_on), 0b0101_0101_0101);
    }

    #[test]
    fn test_ci() {
        assert_eq!(ci(0, 12), 0);
        assert_eq!(ci(1, 12), 1);
        assert_eq!(ci(2, 12), 2);
        assert_eq!(ci(3, 12), 3);
        assert_eq!(ci(4, 12), 4);
        assert_eq!(ci(5, 12), 5);
        assert_eq!(ci(6, 12), 6);
        assert_eq!(ci(7, 12), 7);
        assert_eq!(ci(8, 12), 8);
        assert_eq!(ci(9, 12), 9);
        assert_eq!(ci(10, 12), 10);
        assert_eq!(ci(11, 12), 11);
        assert_eq!(ci(12, 12), 0);
        assert_eq!(ci(13, 12), 1);
        assert_eq!(ci(14, 12), 2);
        assert_eq!(ci(15, 12), 3);
        assert_eq!(ci(16, 12), 4);
        assert_eq!(ci(17, 12), 5);
        assert_eq!(ci(18, 12), 6);
        assert_eq!(ci(19, 12), 7);
        assert_eq!(ci(20, 12), 8);
        assert_eq!(ci(21, 12), 9);
        assert_eq!(ci(22, 12), 10);
        assert_eq!(ci(23, 12), 11);
        assert_eq!(ci(24, 12), 0);
    }

    // #[test]
    // fn test_get_triad_qualities() {
    //     let intervals = vec![2,2,1,2,2,2,1];
    //     let expected_qualities = vec![
    //         String::from("Maj"),
    //         String::from("min"),
    //         String::from("min"),
    //         String::from("Maj"),
    //         String::from("Maj"),
    //         String::from("min"),
    //         String::from("Dim"),
    //     ];
    //     assert_eq!(get_triad_qualities(intervals), expected_qualities);

    //     let intervals = vec![2,2,2,2,2,2];
    //     let expected_qualities = vec![
    //         String::from("Aug"),
    //         String::from("Aug"),
    //         String::from("Aug"),
    //         String::from("Aug"),
    //         String::from("Aug"),
    //         String::from("Aug"),
    //     ];
    //     assert_eq!(get_triad_qualities(intervals), expected_qualities);
    // }
}
