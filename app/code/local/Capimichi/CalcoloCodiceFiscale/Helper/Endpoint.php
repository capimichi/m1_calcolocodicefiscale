<?php

class Capimichi_CalcoloCodiceFiscale_Helper_Endpoint extends Mage_Core_Helper_Abstract
{
    const CHECK_ENDPOINT     = "http://webservices.dotnethell.it/codicefiscale.asmx/ControllaCodiceFiscale?CodiceFiscale={fiscalcode}";
    const CALCULATE_ENDPOINT = "http://webservices.dotnethell.it/codicefiscale.asmx/CalcolaCodiceFiscale?Nome={firstname}&Cognome={lastname}&ComuneNascita={common}&DataNascita={birthday}&Sesso={gender}";
    
    /**
     * @author Michele Capicchioni <capimichi@gmail.com>
     *
     * @param $fiscalCode
     *
     * @return mixed|string
     */
    public function getCheckUrl($fiscalCode)
    {
        $endpoint = self::CHECK_ENDPOINT;
        $endpoint = str_replace("{fiscalcode}", $fiscalCode, $endpoint);
        return $endpoint;
    }
    
    /**
     * @author Michele Capicchioni <capimichi@gmail.com>
     *
     * @param $firstname
     * @param $lastname
     * @param $common
     * @param $day
     * @param $month
     * @param $year
     * @param $gender
     *
     * @return mixed|string
     */
    public function getCalculateUrl($firstname, $lastname, $common, $day, $month, $year, $gender)
    {
        $endpoint = self::CALCULATE_ENDPOINT;
        $endpoint = str_replace("{firstname}", $firstname, $endpoint);
        $endpoint = str_replace("{lastname}", $lastname, $endpoint);
        $endpoint = str_replace("{common}", $common, $endpoint);
        $endpoint = str_replace("{birthday}", sprintf("%02d/%02d/%s", $day, $month, $year), $endpoint);
        $endpoint = str_replace("{gender}", $gender, $endpoint);
        
        return $endpoint;
    }
}