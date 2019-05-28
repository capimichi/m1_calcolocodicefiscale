<?php

class Capimichi_CalcoloCodiceFiscale_Block_Checker extends Mage_Core_Block_Template
{
    const CHECK_ENDPOINT = "http://webservices.dotnethell.it/codicefiscale.asmx/ControllaCodiceFiscale?CodiceFiscale={fiscalcode}";
    
    public function getCheckUrl()
    {
        return self::CHECK_ENDPOINT;
    }
    
}