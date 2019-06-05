# Calcolo Codice Fiscale
Modulo per calcolare il codice fiscale su Magento 1.

## Verificatore
Questo tool verifica il codice fiscale, il codice per inserirlo è:

```php
<?php
echo $this->getLayout()
->createBlock('calcolocodicefiscale/checker')
->setData([
            'fiscal_code_selector' => "input[id='billing:taxvat']",
            'submit_button_selector' => '#onestepcheckout-button-place-order',
        ])
        ->setTemplate('capimichi/calcolo_codice_fiscale/checker.phtml')
        ->toHtml();
                    ?>
```
## Calcolatore
Questo tool calcola il codice fiscale, il codice per inserirlo è:

```php
<?php
    echo $this->getLayout()->createBlock('calcolocodicefiscale/calculator')
        ->setData([
            'fiscal_code_selector' => "input[id='billing:taxvat']"
        ])
        ->setTemplate('capimichi/calcolo_codice_fiscale/calculator.phtml')
        ->toHtml();
                    ?>
```