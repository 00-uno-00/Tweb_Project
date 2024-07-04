package utils.springboot_server.CTIS;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * Service class for CTI (Calcio Trends Impact) Score operations.
 * This class provides methods to interact with the CTIRepository for CRUD operations and custom queries.
 */
@Service
public class CTIService {
    private final CTIRepository ctiRepository;

    /**
     * Constructs a CTIService with dependency injection for the CTIRepository.
     * @param ctiRepository The repository used for CTI score operations.
     */
    @Autowired
    public CTIService(CTIRepository ctiRepository) {
        this.ctiRepository = ctiRepository;
    }

    /**
     * Saves a list of CTIS entities to the database.(POC)
     * @param ctis The list of CTIS entities to be saved.
     * @return The list of saved CTIS entities.
     */
    public List<CTIS> saveCTIs(List<CTIS> ctis) {return ctiRepository.saveAll(ctis);}

    /**
     * Retrieves a list of CTIS entities by their IDs.
     * @param ids The list of IDs for the CTIS entities to retrieve.
     * @return The list of found CTIS entities.
     */
    public List<CTIS> getCTIsByIds(List<Long> ids) {return ctiRepository.findAllById(ids);}

    /**
     * Retrieves the CTI score for a specific player by their ID.
     * @param id The ID of the player whose CTI score is to be retrieved.
     * @return The CTI score of the specified player.
     */
    public Integer getScoreById(long id) {
        return ctiRepository.findScoreById(id);
    }

    /**
     * Retrieves CTI scores for a list of player IDs.
     * @param playerIds The list of player IDs whose CTI scores are to be retrieved.
     * @return A list of CTI scores for the specified player IDs.
     */
    public List<Integer> getScoreByList(List<Long> playerIds) {
        return ctiRepository.findScoreByList(playerIds);
    }

    /**
     * Retrieves the top 15 CTI scores.
     * @return A list of CTIS entities representing the top 15 CTI scores.
     */
    public List<CTIS> getTop15() {
        return ctiRepository.findTop15();
    }
}