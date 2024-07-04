package utils.springboot_server.Championship;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

/**
 * Represents a Championship entity in the database.
 * This class is used to map the championships table in the database to a Java object.
 * Each field in the class corresponds to a column in the table.
 */
@Entity
@Table(name = "championships")
public class Championship {
    @Id
    @Column(name = "competition_id")
    private String id;

    @Column(name = "competition_code")
    private String competitionCode;

    @Column(name = "name")
    private String name;

    @Column(name = "sub_type")
    private String subType;

    @Column(name = "type")
    private String type;

    @Column(name = "country_id")
    private Long countryId;

    @Column(name = "country_name")
    private String countryName;

    @Column(name = "domesticLeagueCode")
    private String domestic_league_code;

    @Column(name = "confederation")
    private String confederation;

    @Column(name = "url")
    private String url;

    // Getters and setters for each field
    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getCompetitionCode() {
        return competitionCode;
    }

    public void setCompetitionCode(String competitionCode) {
        this.competitionCode = competitionCode;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getSubType() {
        return subType;
    }

    public void setSubType(String subType) {
        this.subType = subType;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public Long getCountryId() {
        return countryId;
    }

    public void setCountryId(Long countryId) {
        this.countryId = countryId;
    }

    public String getCountryName() {
        return countryName;
    }

    public void setCountryName(String countryName) {
        this.countryName = countryName;
    }

    public String getDomestic_league_code() {
        return domestic_league_code;
    }

    public void setDomestic_league_code(String domestic_league_code) {
        this.domestic_league_code = domestic_league_code;
    }

    public String getConfederation() {
        return confederation;
    }

    public void setConfederation(String confederation) {
        this.confederation = confederation;
    }

    public String getUrl() {
        return url;
    }

    public void setUrl(String url) {
        this.url = url;
    }
}