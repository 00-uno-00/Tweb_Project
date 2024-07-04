package utils.springboot_server.CTIS;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.beans.factory.annotation.Autowired;
import java.util.List;

/**
 * Controller for handling CTI (Calcio Trends Impact) Score related requests.
 * Provides endpoints for retrieving CTI scores by player ID, a list of player IDs, and the top 15 CTI scores.
 */
@RestController
@RequestMapping("/CTI_Score")
public class CTIController {
    private final CTIService ctiService;

    /**
     * Constructs a CTIController with the specified CTIService.
     * @param ctiService The service to handle CTI score operations.
     */
    @Autowired
    public CTIController(CTIService ctiService) {this.ctiService = ctiService;}

    /**
     * Endpoint to retrieve a CTI score by player ID.
     * @param player_id The ID of the player whose CTI score is to be retrieved.
     * @return ResponseEntity containing the requested CTI score and HTTP status OK.
     */
    @GetMapping("/getScore/{player_id}")
    public ResponseEntity<Integer> getScoreById(@PathVariable long player_id) {
        return new ResponseEntity<>(ctiService.getScoreById(player_id), HttpStatus.OK);
    }

    /**
     * Endpoint to retrieve CTI scores for a list of player IDs.
     * @param player_ids The list of player IDs whose CTI scores are to be retrieved.
     * @return ResponseEntity containing a list of CTI scores for the specified player IDs and HTTP status OK.
     */
    @GetMapping("/getScoreByList/{player_ids}")
    public ResponseEntity<List<Integer>> getScoreByList(@PathVariable List<Long> player_ids) {
        return new ResponseEntity<>(ctiService.getScoreByList(player_ids), HttpStatus.OK);
    }

    /**
     * Endpoint to retrieve the top 15 CTI scores.
     * @return ResponseEntity containing a list of the top 15 CTIS entities and HTTP status OK.
     */
    @GetMapping("/getTop15")
    public ResponseEntity<List<CTIS>> getTop15() {
        return new ResponseEntity<>(ctiService.getTop15(), HttpStatus.OK);
    }
}