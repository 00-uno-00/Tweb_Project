package utils.springboot_server.Team;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "teams")
public class Team {
    @Id
    @Column(name = "club_id", nullable = false)
    private int id;

    @Column(name = "club_code")
    private String code;

    @Column(name = "name")
    private String name;

    @Column(name = "domestic_competition_id")
    private String domesticCompetitionId;

    @Column(name = "total_market_value")
    private int totalMarketValue;

    @Column(name = "squad_size")
    private int squadSize;

    @Column(name = "average_age")
    private int averageAge;

    @Column(name = "foreigners_number")
    private int foreignersNumber;

    @Column(name = "foreigners_percentage")
    private double foreignersPercentage;

    @Column(name = "national_team_players")
    private int nationalTeamPlayers;

    @Column(name = "stadium_name")
    private String stadiumName;

    @Column(name = "stadium_seats")
    private int stadiumSeats;

    @Column(name = "net_transfer_record")
    private String netTransferRecord;

    @Column(name = "coach_name")
    private String coachName;

    @Column(name = "last_season")
    private int lastSeason;

    @Column(name = "url")
    private String url;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDomesticCompetitionId() {
        return domesticCompetitionId;
    }

    public void setDomesticCompetitionId(String domesticCompetitionId) {
        this.domesticCompetitionId = domesticCompetitionId;
    }

    public int getTotalMarketValue() {
        return totalMarketValue;
    }

    public void setTotalMarketValue(int totalMarketValue) {
        this.totalMarketValue = totalMarketValue;
    }

    public int getSquadSize() {
        return squadSize;
    }

    public void setSquadSize(int squadSize) {
        this.squadSize = squadSize;
    }

    public int getAverageAge() {
        return averageAge;
    }

    public void setAverageAge(int averageAge) {
        this.averageAge = averageAge;
    }

    public int getForeignersNumber() {
        return foreignersNumber;
    }

    public void setForeignersNumber(int foreignersNumber) {
        this.foreignersNumber = foreignersNumber;
    }

    public double getForeignersPercentage() {
        return foreignersPercentage;
    }

    public void setForeignersPercentage(double foreignersPercentage) {
        this.foreignersPercentage = foreignersPercentage;
    }

    public int getNationalTeamPlayers() {
        return nationalTeamPlayers;
    }

    public void setNationalTeamPlayers(int nationalTeamPlayers) {
        this.nationalTeamPlayers = nationalTeamPlayers;
    }

    public String getStadiumName() {
        return stadiumName;
    }

    public void setStadiumName(String stadiumName) {
        this.stadiumName = stadiumName;
    }

    public int getStadiumSeats() {
        return stadiumSeats;
    }

    public void setStadiumSeats(int stadiumSeats) {
        this.stadiumSeats = stadiumSeats;
    }

    public String getNetTransferRecord() {
        return netTransferRecord;
    }

    public void setNetTransferRecord(String netTransferRecord) {
        this.netTransferRecord = netTransferRecord;
    }

    public String getCoachName() {
        return coachName;
    }

    public void setCoachName(String coachName) {
        this.coachName = coachName;
    }

    public int getLastSeason() {
        return lastSeason;
    }

    public void setLastSeason(int lastSeason) {
        this.lastSeason = lastSeason;
    }

    public String getUrl() {
        return url;
    }

    public void setUrl(String url) {
        this.url = url;
    }
}
