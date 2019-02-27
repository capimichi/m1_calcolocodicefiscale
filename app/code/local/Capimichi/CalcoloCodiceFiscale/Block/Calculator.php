<?php

class Capimichi_CalcoloCodiceFiscale_Block_Calculator extends Mage_Core_Block_Template
{
    const COMUNI_JSON_ENDPOINT = "https://raw.githubusercontent.com/capimichi/m1_calcolocodicefiscale/master/comuni.json";
    
    public function getCommons()
    {
        $url = self::COMUNI_JSON_ENDPOINT;
        $data = file_get_contents($url);
        if ($data) {
            $json = json_decode($data, true);
            if (isset($json['comuni'])) {
                return $json['comuni'];
            }
        }
        return [];
    }
    
}