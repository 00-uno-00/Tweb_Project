package utils.springboot_server.CTIS;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.beans.factory.annotation.Autowired;
import utils.springboot_server.Player.PlayerController;

import java.io.Console;
import java.util.List;

@RestController
@RequestMapping("/CTI_Score")
public class CTIController {
    private final CTIService ctiService;

    public CTIController(CTIService ctiService) {this.ctiService = ctiService;}

    @GetMapping("/getScore/{player_id}")
    public ResponseEntity<Integer> getScoreById(@PathVariable long player_id) {
        return new ResponseEntity<>(ctiService.getScoreById(player_id), HttpStatus.OK);
    }

    @GetMapping("/getScoreByList/{player_ids}")
    public ResponseEntity<List<Integer>> getScoreByList(@PathVariable List<Long> player_ids) {
        return new ResponseEntity<>(ctiService.getScoreByList(player_ids), HttpStatus.OK);
    }

    @GetMapping("/getTop15")
    public ResponseEntity<List<CTIS>> getTop15() {
        return new ResponseEntity<>(ctiService.getTop15(), HttpStatus.OK);
    }
}
