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
}
