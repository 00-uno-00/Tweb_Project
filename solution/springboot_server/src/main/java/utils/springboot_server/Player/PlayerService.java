package utils.springboot_server.Player;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.ArrayList;
import java.util.List;

@Service
public class PlayerService {
    private final PlayerRepository playerRepository;

    @Autowired
    public PlayerService(PlayerRepository playerRepository) {
        this.playerRepository = playerRepository;
    }

    public List<Player> getPlayersByCurrentClubId(long currentClubId) {
        return playerRepository.findByCurrentClubId(currentClubId);
    }

    public Player getPlayerByName(String name) {
        return playerRepository.findByName(name);
    }
}
