package utils.springboot_server.Championship;

import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.beans.factory.annotation.Autowired;
import utils.springboot_server.Team.Team;

import java.io.Console;
import java.util.List;

@RestController
@RequestMapping("/Championship")
public class ChampionshipController {
    private final ChampionshipService championshipService;

    public ChampionshipController(ChampionshipService championshipService) {
        this.championshipService = championshipService;
    }

    @GetMapping("/getChampionshipById/{id}")
    public ResponseEntity<Championship> getChampionshipById(@PathVariable String id) {
        return new ResponseEntity<>(championshipService.getChampionshipById(id), HttpStatus.OK);
    }

    @GetMapping("/getChampionshipByName/{name}")
    public ResponseEntity<Championship> getChampionshipByName(@PathVariable String name) {
        return new ResponseEntity<>(championshipService.getChampionshipByName(name), HttpStatus.OK);
    }

    @GetMapping("/getFirstTierChampionships")
    public ResponseEntity<List<Championship>> getFirstTierChampionships() {
        return new ResponseEntity<>(championshipService.getFirstTierChampionships(), HttpStatus.OK);
    }

    @GetMapping("/getChampionships")
    public ResponseEntity<List<Championship>> getChampionships() {
        return new ResponseEntity<>(championshipService.getChampionships(), HttpStatus.OK);
    }

    @GetMapping("/search")
    public ResponseEntity<List<Championship>> searchTeams(@RequestParam String query) {
        Pageable page = PageRequest.of(0, 10);
        List<Championship> result = championshipService.searchChamp(query, page);
        return new ResponseEntity<>(result, HttpStatus.OK);
    }
}
