package utils.springboot_server.Championship;

import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.beans.factory.annotation.Autowired;
import java.util.List;

/**
 * Controller for handling Championship related requests.
 * Provides endpoints for retrieving championship details by various criteria.
 */
@RestController
@RequestMapping("/Championship")
public class ChampionshipController {
    private final ChampionshipService championshipService;

    /**
     * Constructs a ChampionshipController with the specified ChampionshipService.
     * @param championshipService The service to handle championship operations.
     */
    @Autowired
    public ChampionshipController(ChampionshipService championshipService) {
        this.championshipService = championshipService;
    }

    /**
     * Endpoint to retrieve a championship by its ID.
     * @param id The ID of the championship to retrieve.
     * @return ResponseEntity containing the requested Championship and HTTP status OK.
     */
    @GetMapping("/getChampionshipById/{id}")
    public ResponseEntity<Championship> getChampionshipById(@PathVariable String id) {
        return new ResponseEntity<>(championshipService.getChampionshipById(id), HttpStatus.OK);
    }

    /**
     * Endpoint to retrieve a championship by its name.
     * @param name The name of the championship to retrieve.
     * @return ResponseEntity containing the requested Championship and HTTP status OK.
     */
    @GetMapping("/getChampionshipByName/{name}")
    public ResponseEntity<Championship> getChampionshipByName(@PathVariable String name) {
        return new ResponseEntity<>(championshipService.getChampionshipByName(name), HttpStatus.OK);
    }

    /**
     * Endpoint to retrieve all first-tier championships.
     * @return ResponseEntity containing a list of first-tier Championships and HTTP status OK.
     */
    @GetMapping("/getFirstTierChampionships")
    public ResponseEntity<List<Championship>> getFirstTierChampionships() {
        return new ResponseEntity<>(championshipService.getFirstTierChampionships(), HttpStatus.OK);
    }

    /**
     * Endpoint to retrieve all championships.
     * @return ResponseEntity containing a list of Championships and HTTP status OK.
     */
    @GetMapping("/getChampionships")
    public ResponseEntity<List<Championship>> getChampionships() {
        return new ResponseEntity<>(championshipService.getChampionships(), HttpStatus.OK);
    }

    /**
     * Endpoint to retrieve the number of championships.
     * @return ResponseEntity containing the number of Championships and HTTP status OK.
     */
    @GetMapping("/getNumberOfChampionships")
    public ResponseEntity<Long> getNumberOfChampionships() {
        return new ResponseEntity<>(championshipService.getNumberOfChampionships(), HttpStatus.OK);
    }

    /**
     * Endpoint to search for championships based on a query string.
     * @param query The query string to search for.
     * @return ResponseEntity containing a list of Championships that match the query and HTTP status OK.
     */
    @GetMapping("/search")
    public ResponseEntity<List<Championship>> searchTeams(@RequestParam String query) {
        Pageable page = PageRequest.of(0, 10);
        List<Championship> result = championshipService.searchChamp(query, page);
        return new ResponseEntity<>(result, HttpStatus.OK);
    }
}