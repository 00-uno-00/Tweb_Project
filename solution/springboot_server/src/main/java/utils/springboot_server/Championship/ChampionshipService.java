package utils.springboot_server.Championship;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ChampionshipService {

    @Autowired
    private ChampionshipRepository championshipRepository;

    public List<Championship> getAllChampionships() {
        return championshipRepository.findAll();
    }

    public Championship getChampionshipById(String id) {
        return championshipRepository.findById(id).orElse(null);
    }

    public Championship addChampionship(Championship championship) {
        return championshipRepository.save(championship);
    }

    public Championship updateChampionship(Championship championship) {
        return championshipRepository.save(championship);
    }

    public void deleteChampionship(String id) {
        championshipRepository.deleteById(id);
    }

    public List<Championship> getFirstTierChampionships() {
        return championshipRepository.findFirstTierChampionships();
    }

    public List<Championship> searchChamp(String query, Pageable page) {
        return championshipRepository.findByNameContainingIgnoreCase(query, page);
    }
}
