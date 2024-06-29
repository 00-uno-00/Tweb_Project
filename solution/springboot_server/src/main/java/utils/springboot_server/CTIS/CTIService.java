package utils.springboot_server.CTIS;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import utils.springboot_server.Player.Player;
import utils.springboot_server.Player.PlayerController;

import java.util.List;
import java.util.Optional;

@Service
public class CTIService {
    private final CTIRepository ctiRepository;

    @Autowired
    public CTIService(CTIRepository ctiRepository) {
        this.ctiRepository = ctiRepository;
    }

    public List<CTIS> saveCTIs(List<CTIS> ctis) {return ctiRepository.saveAll(ctis);}

    public List<CTIS> getCTIsByIds(List<Long> ids) {return ctiRepository.findAllById(ids);}

    public Integer getScoreById(long id) {
        return ctiRepository.findScoreById(id);
    }

    public List<Integer> getScoreByList(List<Long> playerIds) {
        return ctiRepository.findScoreByList(playerIds);
    }

    public List<CTIS> getTop15() {
        return ctiRepository.findTop15();
    }
}
