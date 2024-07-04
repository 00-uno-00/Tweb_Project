package utils.springboot_server.Player;

import org.springframework.data.domain.PageRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;

import java.util.List;

/**
 * Controller class for player-related operations.
 * Handles HTTP requests for operations on players, such as retrieving players by various criteria,
 * adding new players, and searching for players based on a query.
 */
@RestController
@RequestMapping("/Player")
public class PlayerController {
    private final PlayerService playerService;

    /**
     * Constructs a PlayerController with a dependency on PlayerService.
     * @param playerService The service used for player operations.
     */
    @Autowired
    public PlayerController(PlayerService playerService) {
        this.playerService = playerService;
    }

    /**
     * Retrieves a list of players associated with a specific club ID.
     * @param currentClubId The ID of the club.
     * @return A ResponseEntity containing the list of players and the HTTP status code.
     */
    @GetMapping("/getPlayersByCurrentClubId/{currentClubId}")
    public ResponseEntity<List<Player>> getPlayersByCurrentClubId(@PathVariable long currentClubId) {
        return new ResponseEntity<>(playerService.getPlayersByCurrentClubId(currentClubId), HttpStatus.OK);
    }

    /**
     * Retrieves a player by their name.
     * @param name The name of the player.
     * @return A ResponseEntity containing the player and the HTTP status code.
     */
    @GetMapping("/getPlayerByName/{name}")
    public ResponseEntity<Player> getPlayerByName(@PathVariable String name) {
        return new ResponseEntity<>(playerService.getPlayerByName(name), HttpStatus.OK);
    }

    /**
     * Retrieves a player by their ID.
     * @param id The ID of the player.
     * @return A ResponseEntity containing the player and the HTTP status code.
     */
    @GetMapping("/getPlayerById/{id}")
    public ResponseEntity<Player> getPlayerById(@PathVariable long id) {
        return new ResponseEntity<>(playerService.getPlayerById(id), HttpStatus.OK);
    }

    /**
     * Retrieves the total number of players.
     * @return A ResponseEntity containing the number of players and the HTTP status code.
     */
    @GetMapping("/getNumberOfPlayers")
    public ResponseEntity<Long> getNumberOfPlayers() {
        return new ResponseEntity<>(playerService.getNumberOfPlayers(), HttpStatus.OK);
    }

    /**
     * Retrieves the total score of a club based on its ID.
     * @param currentClubId The ID of the club.
     * @return A ResponseEntity containing the club's score and the HTTP status code.
     */
    @GetMapping("/getCurrentClubScore/{currentClubId}")
    public ResponseEntity<Float> getCurrentClubScore(@PathVariable long currentClubId) {
        return new ResponseEntity<>(playerService.getCurrentClubScore(currentClubId), HttpStatus.OK);
    }

    /**
     * Searches for players based on a query string.
     * @param query The query string used for searching.
     * @return A ResponseEntity containing the list of players matching the query and the HTTP status code.
     */
    @GetMapping("/search")
    public ResponseEntity<List<Player>> searchPlayers(@RequestParam String query) {
        Pageable page = PageRequest.of(0, 10);
        List<Player> result = playerService.searchPlayers(query, page);
        return new ResponseEntity<>(result, HttpStatus.OK);
    }

    /**
     * Adds a list of new players to the database.(POC)
     * @param players The list of players to be added.
     * @return A ResponseEntity containing the list of added players and the HTTP status code.
     */
    @PostMapping("/addPlayers")
    public ResponseEntity<List<Player>> addPlayers(@RequestBody List<Player> players) {
        return new ResponseEntity<>(playerService.savePlayers(players), HttpStatus.OK);
    }
}