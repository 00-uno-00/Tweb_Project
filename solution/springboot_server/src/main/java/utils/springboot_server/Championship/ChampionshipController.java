package utils.springboot_server.Championship;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.beans.factory.annotation.Autowired;

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

    @GetMapping("/getFirstTierChampionships")
    public ResponseEntity<List<Championship>> getFirstTierChampionships() {
        return new ResponseEntity<>(championshipService.getFirstTierChampionships(), HttpStatus.OK);
    }

}
