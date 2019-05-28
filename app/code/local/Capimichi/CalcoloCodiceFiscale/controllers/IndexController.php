<?php

class Capimichi_CalcoloCodiceFiscale_IndexController extends Mage_Core_Controller_Front_Action
{
    const CALCULATE_ENDPOINT   = "http://webservices.dotnethell.it/codicefiscale.asmx/CalcolaCodiceFiscale?Nome={name}&Cognome={lastname}&ComuneNascita={common}&DataNascita={birthday}&Sesso={gender}";
    const CHECK_ENDPOINT       = "http://webservices.dotnethell.it/codicefiscale.asmx/ControllaCodiceFiscale?CodiceFiscale={fiscalcode}";
    const COMUNI_JSON_ENDPOINT = "https://raw.githubusercontent.com/capimichi/m1_calcolocodicefiscale/master/comuni.json";
    
    public function commonsAction()
    {
        header('Content-Type: application/json');
        
        $url = self::COMUNI_JSON_ENDPOINT;
        $data = file_get_contents($url);
        echo $data;
    }
    
    public function calculateAction()
    {
        header('Content-Type: application/json');
        
    }
    
    public function checkAction()
    {
        header('Content-Type: application/json');
        
        $endpointHelper = Mage::helper('calcolocodicefiscale/endpoint');
        
        $fiscalCode = isset($_GET['fiscalCode']) ? $_GET['fiscalCode'] : "";
        
        $checkUrl = $endpointHelper->getCheckUrl($fiscalCode);
        
        $ch = curl_init();
        curl_setopt($ch, CURLOPT_URL, $checkUrl);
        curl_setopt($ch, CURLOPT_USERAGENT, "Mozilla/4.0 (compatible; MSIE 8.0; Windows NT 6.0)");
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
        curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, false);
        curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
        curl_setopt($ch, CURLOPT_MAXREDIRS, 10);
        curl_setopt($ch, CURLOPT_CONNECTTIMEOUT, 5);
        curl_setopt($ch, CURLOPT_TIMEOUT, 20);
        $rt = curl_exec($ch);
        $info = curl_getinfo($ch);
        
        $status = $info["http_code"];
        
        echo json_encode([
            'status' => $status,
        ]);
        
        
    }
    
}