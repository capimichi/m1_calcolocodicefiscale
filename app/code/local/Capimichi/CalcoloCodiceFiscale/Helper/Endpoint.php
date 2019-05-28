<?php

class Capimichi_CalcoloCodiceFiscale_Helper_Endpoint extends Mage_Core_Helper_Abstract
{
    const CHECK_ENDPOINT = "http://webservices.dotnethell.it/codicefiscale.asmx/ControllaCodiceFiscale?CodiceFiscale={fiscalcode}";
    
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
}