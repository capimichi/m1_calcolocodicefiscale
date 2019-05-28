<?php

class Capimichi_CalcoloCodiceFiscale_Block_Calculator extends Mage_Core_Block_Template
{
    const CALCULATE_ENDPOINT   = "http://webservices.dotnethell.it/codicefiscale.asmx/CalcolaCodiceFiscale?Nome={name}&Cognome={lastname}&ComuneNascita={common}&DataNascita={birthday}&Sesso={gender}";
    const CHECK_ENDPOINT       = "http://webservices.dotnethell.it/codicefiscale.asmx/ControllaCodiceFiscale?CodiceFiscale={fiscalcode}";
    const COMUNI_JSON_ENDPOINT = "https://raw.githubusercontent.com/capimichi/m1_calcolocodicefiscale/master/comuni.json";
    
    public function getCommons()
    {
    
    }
    
    public function getCalculateUrl()
    {
        return self::CALCULATE_ENDPOINT;
    }
    
    public function getCheckUrl()
    {
        return self::CHECK_ENDPOINT;
    }
    
}