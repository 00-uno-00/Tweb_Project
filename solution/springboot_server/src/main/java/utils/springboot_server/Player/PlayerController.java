package utils.springboot_server.Player;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;

@RestController
@RequestMapping("/player")
public class PlayerController {
    private final PlayerService playerService;

    public PlayerController(PlayerService playerService) {
        this.playerService = playerService;
    }

    /**
     * This method is used to get players by their current club ID.
     *
     * @param currentClubId The ID of the current club.
     * @return ResponseEntity containing the list of players and HTTP status.
     */
    @GetMapping("/getPlayersByCurrentClubId/{currentClubId}")
    public ResponseEntity<List<Player>> getPlayersByCurrentClubId(@PathVariable long currentClubId) {
        return new ResponseEntity<>(playerService.getPlayersByCurrentClubId(currentClubId), HttpStatus.OK);
    }

    /**
     * This method is used to get a player by its name.
     *
     * @param name The name of the player to retrieve.
     * @return ResponseEntity containing the player and HTTP status.
     */
    @GetMapping("/getPlayerByName/{name}")
    public ResponseEntity<Player> getPlayerByName(@PathVariable String name) {
        return new ResponseEntity<>(playerService.getPlayerByName(name), HttpStatus.OK);
    }
}
