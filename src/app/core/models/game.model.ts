/**
 * Represents the JSON payload from the raspberry pi.
 * Make sure this format matches what the payload is
 * from the raspberry pi. If you change the format
 * on the pi, make sure you change it here too.
 */
export interface IGame {
  /**
   * The score of team red.
   */
  redTeamScore: number;

  /**
   * The score of team blue.
   */
  blueTeamScore: number;
}
