let inputConfig = document.getElementById('inputConfig');
let byte3Config = document.getElementById('config-byte3');
let byte2Config = document.getElementById('config-byte2');
let byte1Config = document.getElementById('config-byte1');

const byte1CfgCheckBoxContainer = document.getElementById('byte1CgfCheckBoxContainer');
const byte2CfgCheckBoxContainer = document.getElementById('byte2CgfCheckBoxContainer');
const byte3CfgCheckBoxContainer = document.getElementById('byte3CgfCheckBoxContainer');


let inputSetup = document.getElementById('inputSetup');
let byte3Setup = document.getElementById('setup-byte3');
let byte2Setup = document.getElementById('setup-byte2');
let byte1Setup = document.getElementById('setup-byte1');

const byte1StpCheckBoxContainer = document.getElementById('byte1StpCheckBoxContainer');
const byte2StpCheckBoxContainer = document.getElementById('byte2StpCheckBoxContainer');
const byte3StpCheckBoxContainer = document.getElementById('byte3StpCheckBoxContainer');

let config = '00000000';
let byte1Cfg = '00';
let byte2Cfg = '00';
let byte3Cfg = '00';
let binByte1Cfg = '00000000';
let binByte2Cfg = '00000000';
let binByte3Cfg = '00000000';

let cfgByte1_bit_012 = '0';
let cfgByte1_bit_34 = '0';
let cfgByte1_bit_56 = '0';
let cfgByte1_bit_7 = '0';

let cfgByte2_bit_0123 = '0';
let cfgByte2_bit_4567 = '0';

let cfgByte3_num = '0';

let setup = '00000000';
let byte1Stp = '00';
let byte2Stp = '00';
let byte3Stp = '00';
let binByte1Stp = '00000000';
let binByte2Stp = '00000000';
let binByte3Stp = '00000000';

let stpByte1_bit_01 = '0';
let stpByte1_bit_2 = '0';
let stpByte1_bit_3 = '0';
let stpByte1_bit_4 = '0';
let stpByte1_bit_5 = '0';
let stpByte1_bit_6 = '0';
let stpByte1_bit_7 = '0';

let stpByte2_bit_0 = '0';
let stpByte2_bit_1 = '0';
let stpByte2_bit_2 = '0';
let stpByte2_bit_3 = '0';
let stpByte2_bit_4 = '0';
let stpByte2_bit_5 = '0';
let stpByte2_bit_6 = '0';
let stpByte2_bit_7 = '0';

let typeLS = [
    '0 - простая одноламповая лазерная система',
    '1 - двухламповая система (Delay1 – QSW1; Delay2 – Delay of Generator Lamp)',
    '2 - длинно импульсная лазерная система',
    '3 - двухламповая система (для PICO: Delay1 – Delay of Oscillator Lamp; Delay2 – Delay of Generator Lamp)',
    '4 - одноламповая, с задержкой запуска лампы (Delay2 – Delay of Lamp ?)',
    '5 - наличие дополнительного канала синхронизации на базе формирователя 2-й задержки',
    '6 - система охлаждения',
    '7 - расширенная конфигурация согласно 3-го байта'];

let typeQSW = [
    '0 - без оптического канала',
    '1 - с одним оптическим каналом (управление QSW)',
    '2 - с двумя оптическими каналами излучения',
    '3 - с двумя оптическими каналами излучения с нано задержками'];

let countFtd = [
    '0 - без индикатора излучения',
    '1 - с одним индикатором излучения',
    '2 - с двумя индикаторами излучения',
    '3 - с тремя индикаторами'];

let stateDepSh = [
    '0 - шторок нет',
    '1 - два состояния',
    '2 - три состояния',
    '3 - четыре состояния',
    '4 - пять состояний',
    '5 - шесть состояний',
    '6 - семь состояний',
    '7 - восемь состояний',
    '8 - девять состояний',
    '9 - десять состояний',
    '10 - 11 состояний',
    '11 - 12 состояний',
    '12 - 13 состояний',
    '13 - 14 состояний',
    '14 - 15 состояний',
    '15 - 16 состояний'];

let stateUndepSh = [
    '0 - независимых шторок нет',
    '1 - одна независимая шторка',
    '2 - две независимые шторки',
    '3 - три независимые шторки',
    '4 - четыре независимые шторки'];

let typeLSByte3 = [
    '0 - LD',
    '1 - PICOLDD',
    '2 - управлениe синхронизацией (PICO)',
    '3 - лазеры нового поколения (LSgeneral)',
    '4 - PIV лазеры (PIVLS)',
    '5 - LSgeneral с аттенюатором ',
    '6 - означает система LDD_Double',
    '7 - LS-COMBO',
    '8 - LS-COMBO Double',
    '9 - LSgeneral Double с 2 каналом зависимых шторок',
    '10 - LS-LP',
    '11 - LIBS_LS',
    '12 - LDD_Double с высоковольтной накачкой'];

let typeCS = [
    '0- без системы охлаждения (СО)',
    '1 - с 1-ой системой СО',
    '2 - наличие 2-х СО',
    '3 - встроенная СО'];

let setIntCloseOpenSh = [
    '0 - закрывать',
    '1 - не закрывать'];

let launchPivCls = [
    '0 - программно (PIV лазер)',
    '1 - аппаратно (CLS)'];

let txtDepSHutters = document.getElementById('txt-4-dep-shutters');
if (cfgByte2_bit_0123 === 0) {
    txtDepSHutters.textContent = '';
}

function setItemDropDown(arr, elem, num){
    const button = document.querySelector(`${elem}`).closest('button');
    
    if(num < arr.length){
        $(elem).text(arr[num]);
        if (button) {
            button.classList.replace('text-danger','text-primary');
            button.classList.remove('border-danger');
        }else{
            console.error('Parent button not found.');
        } 
    }else{
        $(elem).text('unknown value: '+ num);
        if (button) {
            button.classList.add('border-danger');
            button.classList.replace('text-primary', 'text-danger');
        }else{
            console.error('Parent button not found.');
        }        
    }    
}

function setupDropDownsAndCheckBoxes(){
    updCfgBits();
    updSetupBits();

    setItemDropDown(typeLS, '#txt-dd-btn-type-ls', cfgByte1_bit_012);
    setItemDropDown(typeQSW, '#txt-dd-btn-type-qsw', cfgByte1_bit_34);
    setItemDropDown(countFtd, '#txt-dd-btn-count-ftd', cfgByte1_bit_56);
    setBit('fh-oven-temperature-bit7',cfgByte1_bit_7);

    setItemDropDown(stateDepSh, '#txt-dd-btn-state-dep-sh', cfgByte2_bit_0123);
    setItemDropDown(stateUndepSh, '#txt-dd-btn-state-undep-sh', cfgByte2_bit_4567);

    setItemDropDown(typeLSByte3, '#txt-dd-btn-config', cfgByte3_num);

    setItemDropDown(typeCS, '#txt-dd-btn-type-cs', stpByte1_bit_01);
    setBit('setup-byte1-bit2',stpByte1_bit_2);
    setBit('setup-byte1-bit3',stpByte1_bit_3);
    setBit('setup-byte1-bit4',stpByte1_bit_4);
    setBit('setup-byte1-bit5',stpByte1_bit_5);
    setBit('setup-byte1-bit6',stpByte1_bit_6);
    setBit('setup-byte1-bit7',stpByte1_bit_7);

    setBit('setup-byte2-bit0',stpByte2_bit_0);
    setBit('setup-byte2-bit1',stpByte2_bit_1);
    setBit('setup-byte2-bit2',stpByte2_bit_2);
    setBit('setup-byte2-bit3',stpByte2_bit_3);
    setBit('setup-byte2-bit4',stpByte2_bit_4);
    setItemDropDown(setIntCloseOpenSh, '#txt-dd-btn-close-open', stpByte2_bit_5);
    setBit('setup-byte2-bit6',stpByte2_bit_6);
    setItemDropDown(launchPivCls, '#txt-dd-btn-pfc-piv-cls', stpByte2_bit_7);
    if(cfgByte2_bit_0123 === 0){
        txtDepSHutters.textContent='';
    }else{
        txtDepSHutters.textContent='4-x зависимых шторок';
    } 
}
setupDropDownsAndCheckBoxes();

function setBit(checkboxId, bitValue){
    let checkbox = document.getElementById(checkboxId);    
    checkbox.checked = bitValue === '1';
}

function updCfgBits(){
    cfgByte1_bit_012 = binToDec(binByte1Cfg.substring(5,8)); 
    cfgByte1_bit_34 = binToDec(binByte1Cfg.substring(3,5));
    cfgByte1_bit_56 = binToDec(binByte1Cfg.substring(1,3));
    cfgByte1_bit_7 = binByte1Cfg.substring(0,1);

    cfgByte2_bit_0123 = binToDec(binByte2Cfg.substring(4,8)); 
    cfgByte2_bit_4567 = binToDec(binByte2Cfg.substring(0,4)); 

    cfgByte3_num = binToDec(binByte3Cfg);
}
function updSetupBits(){
    stpByte1_bit_01 = binToDec(binByte1Stp.substring(6,8));
    stpByte1_bit_2 = binByte1Stp.substring(5,6);
    stpByte1_bit_3 = binByte1Stp.substring(4,5);
    stpByte1_bit_4 = binByte1Stp.substring(3,4);
    stpByte1_bit_5 = binByte1Stp.substring(2,3);
    stpByte1_bit_6 = binByte1Stp.substring(1,2);
    stpByte1_bit_7 = binByte1Stp.substring(0,1);

    stpByte2_bit_0 = binByte2Stp.substring(7,8);
    stpByte2_bit_1 = binByte2Stp.substring(6,7);
    stpByte2_bit_2 = binByte2Stp.substring(5,6);
    stpByte2_bit_3 = binByte2Stp.substring(4,5);
    stpByte2_bit_4 = binByte2Stp.substring(3,4);
    stpByte2_bit_5 = binByte2Stp.substring(2,3);
    stpByte2_bit_6 = binByte2Stp.substring(1,2);
    stpByte2_bit_7 = binByte2Stp.substring(0,1);    
}

function binToDec(binaryString) {
    return parseInt(binaryString, 2);
}
function decToBin(num) {
    return num.toString(2);
}

inputConfig.addEventListener('input', function () {
    let cleanedValue = inputConfig.value;
    while (cleanedValue.length < 8) {
        cleanedValue = '0' + cleanedValue;
    }
    byte1Cfg = cleanedValue.substring(8,6);
    byte2Cfg = cleanedValue.substring(6,4);
    byte3Cfg = cleanedValue.substring(4,2);

    byte1Config.textContent = byte1Cfg;
    byte2Config.textContent = byte2Cfg;
    byte3Config.textContent = byte3Cfg;

    binByte1Cfg = hexToBin(byte1Cfg);
    binByte2Cfg = hexToBin(byte2Cfg);
    binByte3Cfg = hexToBin(byte3Cfg);

    setByteCheckBoxes(byte1CfgCheckBoxContainer, binByte1Cfg); 
    setByteCheckBoxes(byte2CfgCheckBoxContainer, binByte2Cfg);
    setByteCheckBoxes(byte3CfgCheckBoxContainer, binByte3Cfg); 

    setupDropDownsAndCheckBoxes();
});

inputSetup.addEventListener('input', function () {
    let cleanedValue = inputSetup.value;
    while (cleanedValue.length < 8) {
        cleanedValue = '0' + cleanedValue;
    }
    byte1Stp = cleanedValue.substring(8,6);
    byte2Stp = cleanedValue.substring(6,4);
    byte3Stp = cleanedValue.substring(4,2);

    byte1Setup.textContent = byte1Stp;
    byte2Setup.textContent = byte2Stp;
    byte3Setup.textContent = byte3Stp;

    binByte1Stp = hexToBin(byte1Stp);
    binByte2Stp = hexToBin(byte2Stp);
    binByte3Stp = hexToBin(byte3Stp);

    setByteCheckBoxes(byte1StpCheckBoxContainer, binByte1Stp);
    setByteCheckBoxes(byte2StpCheckBoxContainer, binByte2Stp);
    setByteCheckBoxes(byte3StpCheckBoxContainer, binByte3Stp);

    setupDropDownsAndCheckBoxes();
});

setupCheckBoxesListeners();

function limitHexInput(input) {
    input.value = input.value.replace(/[^0-9A-Fa-f]/g, '');

    if (input.value.length > 8) {
      input.value = input.value.substring(0, 8);
    }
}
function hexToBin(hexString) {
    const binaryString = hexString.split('').map(hexDigit => {
      const binaryDigit = parseInt(hexDigit, 16).toString(2).padStart(4, '0');
      return binaryDigit;
    }).join('');

    const paddedBinaryString = binaryString.padStart(8, '0');  

    return paddedBinaryString;
}
function setByteCheckBoxes(byteCheckBoxContainer, binByte) {
    let binByte1Cfg = binByte.split('').join('');
    for (let i = 0; i < byteCheckBoxContainer.children.length; i++) {
        let checkbox = byteCheckBoxContainer.children[i];
        let bitValue = binByte1Cfg[i];
        checkbox.checked = bitValue === '1';
    }
}
function getBinByteFromCheckBoxes(byteCheckBoxContainer){
    let binByte = '';
    for (let i = 0; i < byteCheckBoxContainer.children.length; i++) {
      const checkbox = byteCheckBoxContainer.children[i];     
      binByte += checkbox.checked ? '1' : '0';
    }
    return binByte;
}
function getHexFromBin(binByte) {
    const hexByte = parseInt(binByte, 2).toString(16).toUpperCase();
    return hexByte.padStart(2, '0');
}

function setupCheckBoxesListeners(){
    setByteCheckBoxListeners(byte1CfgCheckBoxContainer, updateInputConfig);
    setByteCheckBoxListeners(byte2CfgCheckBoxContainer, updateInputConfig);
    setByteCheckBoxListeners(byte3CfgCheckBoxContainer, updateInputConfig);

    setByteCheckBoxListeners(byte1StpCheckBoxContainer, updateInputSetup);
    setByteCheckBoxListeners(byte2StpCheckBoxContainer, updateInputSetup);
    setByteCheckBoxListeners(byte3StpCheckBoxContainer, updateInputSetup);
}

function setByteCheckBoxListeners(byteCheckBoxContainer, updateMethod){
    for (let i = 0; i < byteCheckBoxContainer.children.length; i++) {
        const checkbox = byteCheckBoxContainer.children[i];
        
        checkbox.addEventListener('change', updateMethod);
    }
}

function updateInputConfig(){
    binByte1Cfg = getBinByteFromCheckBoxes(byte1CfgCheckBoxContainer);
    binByte2Cfg = getBinByteFromCheckBoxes(byte2CfgCheckBoxContainer);
    binByte3Cfg = getBinByteFromCheckBoxes(byte3CfgCheckBoxContainer);
    
    let hexByte1 = getHexFromBin(binByte1Cfg);
    let hexByte2 = getHexFromBin(binByte2Cfg);
    let hexByte3 = getHexFromBin(binByte3Cfg);

    config = '00'+ hexByte3 + hexByte2 + hexByte1;
    console.log('config',config);

    byte1Cfg = config.substring(8,6);
    byte2Cfg = config.substring(6,4);
    byte3Cfg = config.substring(4,2);

    byte1Config.textContent = byte1Cfg;
    byte2Config.textContent = byte2Cfg;
    byte3Config.textContent = byte3Cfg;

    setupDropDownsAndCheckBoxes();

    inputConfig.value = config;
}

function updateInputSetup(){
    binByte1Stp = getBinByteFromCheckBoxes(byte1StpCheckBoxContainer);
    binByte2Stp = getBinByteFromCheckBoxes(byte2StpCheckBoxContainer);
    binByte3Stp = getBinByteFromCheckBoxes(byte3StpCheckBoxContainer);
    let hexByte1 = getHexFromBin(binByte1Stp);
    let hexByte2 = getHexFromBin(binByte2Stp);
    let hexByte3 = getHexFromBin(binByte3Stp);
    setup = '00'+ hexByte3 + hexByte2 + hexByte1;
    byte1Stp = setup.substring(8,6);
    byte2Stp = setup.substring(6,4);
    byte3Stp = setup.substring(4,2);
    byte1Setup.textContent = byte1Stp;
    byte2Setup.textContent = byte2Stp;
    byte3Setup.textContent = byte3Stp;
    setupDropDownsAndCheckBoxes();
    inputSetup.value = setup;
}



function updateText(clickedElement, event) {
    event.preventDefault();    

    let ariaLabelledById = $(clickedElement).closest('ul').attr('aria-labelledby');    
    let selectedLiNumber = $(clickedElement).parent().index();    
    let selectedValue = $(clickedElement).text();  
   
    let str = ariaLabelledById.replace('dd-menu-button-','');
    let part = str.split('-')[0];
    let byte = str.split('-')[1];
    let bit = str.split('-')[2];

    if(part === 'cfg'){
        if(byte === 'byte1'){
            if(bit === 'bit012'){
                $('#txt-dd-btn-type-ls').text(selectedValue);
                let bits = decToBin(selectedLiNumber);
                while (bits.length < 3) {
                    bits = '0' + bits;
                }
                binByte1Cfg = binByte1Cfg.slice(0, -3) + bits;
                setByteCheckBoxes(byte1CfgCheckBoxContainer, binByte1Cfg);
            }
            if(bit === 'bit34'){
                $('#txt-dd-btn-type-qsw').text(selectedValue);
                let bits = decToBin(selectedLiNumber);
                while (bits.length < 2) {
                    bits = '0' + bits;
                }

                binByte1Cfg  = binByte1Cfg.substring(0, 3) + bits + binByte1Cfg.substring(5);
                setByteCheckBoxes(byte1CfgCheckBoxContainer, binByte1Cfg);
            }
            if(bit === 'bit56'){
                let bits = decToBin(selectedLiNumber);
                while (bits.length < 2) {
                    bits = '0' + bits;
                }
                
                binByte1Cfg  = binByte1Cfg.substring(0, 1) + bits + binByte1Cfg.substring(3);
                setByteCheckBoxes(byte1CfgCheckBoxContainer, binByte1Cfg);
            }            
        }
        if(byte === 'byte2'){
            if(bit === 'bit0123'){
                let bits = decToBin(selectedLiNumber);
                while (bits.length < 4) {
                    bits = '0' + bits;
                }        
                binByte2Cfg =  binByte2Cfg.slice(0,4) + bits;
                setByteCheckBoxes(byte2CfgCheckBoxContainer, binByte2Cfg);
            }
            if(bit === 'bit4567'){
                let bits = decToBin(selectedLiNumber);
                while (bits.length < 4) {
                    bits = '0' + bits;
                }         
                binByte2Cfg = bits + binByte2Cfg.slice(4);
                setByteCheckBoxes(byte2CfgCheckBoxContainer, binByte2Cfg);
            }
        }
        if(byte === 'byte3'){
            let bits = decToBin(selectedLiNumber);
            while (bits.length < 8) {
                bits = '0' + bits;
            }
            
            binByte3Cfg = bits;
            setByteCheckBoxes(byte3CfgCheckBoxContainer, binByte3Cfg);
        }
        updateInputConfig(); 
    }
    if(part === 'stp'){
        if(byte === 'byte1'){
            if(bit === 'bit01'){
                let bits = decToBin(selectedLiNumber);
                while (bits.length < 2) {
                    bits = '0' + bits;
                }                
                binByte1Stp = binByte1Stp.slice(0,6) + bits;
                setByteCheckBoxes(byte1StpCheckBoxContainer, binByte1Stp);
            }            
        }
        if(byte === 'byte2'){            
            if(bit === 'bit5'){
                let bits = decToBin(selectedLiNumber);               
                binByte2Stp  = binByte2Stp.substring(0, 2) + bits + binByte2Stp.substring(3, 8);             
                setByteCheckBoxes(byte2StpCheckBoxContainer, binByte2Stp);
            }
            if(bit === 'bit7'){
                let bits = decToBin(selectedLiNumber);               
                binByte2Stp  = bits + binByte2Stp.slice(1);             
                setByteCheckBoxes(byte2StpCheckBoxContainer, binByte2Stp);
            }            
        }
        updateInputSetup();
    }        
}

const cBoxConfigByte1Bit7 = document.getElementById('fh-oven-temperature-bit7');
cBoxConfigByte1Bit7.addEventListener('change', (e)=>{
    let bit = e.target.checked ? '1' : '0';
    binByte1Cfg  = bit + binByte1Cfg.slice(1);
    setByteCheckBoxes(byte1CfgCheckBoxContainer, binByte1Cfg);
    updateInputConfig();
});

const cBoxSetupByte1Bit2 = document.getElementById('setup-byte1-bit2');
cBoxSetupByte1Bit2.addEventListener('change', (e)=>{
    let bit = e.target.checked ? '1' : '0';
    binByte1Stp  = binByte1Stp.slice(0,5) + bit + binByte1Stp.slice(6);
    setByteCheckBoxes(byte1StpCheckBoxContainer, binByte1Stp);
    updateInputSetup();
});

const cBoxSetupByte1Bit3 = document.getElementById('setup-byte1-bit3');
cBoxSetupByte1Bit3.addEventListener('change', (e)=>{
    let bit = e.target.checked ? '1' : '0';
    binByte1Stp  = binByte1Stp.slice(0,4) + bit + binByte1Stp.slice(5);
    setByteCheckBoxes(byte1StpCheckBoxContainer, binByte1Stp);
    updateInputSetup();
});

const cBoxSetupByte1Bit4 = document.getElementById('setup-byte1-bit4');
cBoxSetupByte1Bit4.addEventListener('change', (e)=>{
    let bit = e.target.checked ? '1' : '0';
    binByte1Stp  = binByte1Stp.slice(0,3) + bit + binByte1Stp.slice(4);
    setByteCheckBoxes(byte1StpCheckBoxContainer, binByte1Stp);
    updateInputSetup();
});

const cBoxSetupByte1Bit5 = document.getElementById('setup-byte1-bit5');
cBoxSetupByte1Bit5.addEventListener('change', (e)=>{
    let bit = e.target.checked ? '1' : '0';
    binByte1Stp  = binByte1Stp.slice(0,2) + bit + binByte1Stp.slice(3);
    setByteCheckBoxes(byte1StpCheckBoxContainer, binByte1Stp);
    updateInputSetup();
});

const cBoxSetupByte1Bit6 = document.getElementById('setup-byte1-bit6');
cBoxSetupByte1Bit6.addEventListener('change', (e)=>{
    let bit = e.target.checked ? '1' : '0';
    binByte1Stp  = binByte1Stp.slice(0,1) + bit + binByte1Stp.slice(2);
    setByteCheckBoxes(byte1StpCheckBoxContainer, binByte1Stp);
    updateInputSetup();
});

const cBoxSetupByte1Bit7 = document.getElementById('setup-byte1-bit7');
cBoxSetupByte1Bit7.addEventListener('change', (e)=>{
    let bit = e.target.checked ? '1' : '0';
    binByte1Stp  = bit + binByte1Stp.slice(1);
    setByteCheckBoxes(byte1StpCheckBoxContainer, binByte1Stp);
    updateInputSetup();
});

const cBoxSetupByte2Bit0 = document.getElementById('setup-byte2-bit0');
cBoxSetupByte2Bit0.addEventListener('change', (e)=>{
    let bit = e.target.checked ? '1' : '0';
    binByte2Stp  = binByte2Stp.slice(0,7) + bit;
    setByteCheckBoxes(byte2StpCheckBoxContainer, binByte2Stp);
    updateInputSetup();
});

const cBoxSetupByte2Bit1 = document.getElementById('setup-byte2-bit1');
cBoxSetupByte2Bit1.addEventListener('change', (e)=>{
    let bit = e.target.checked ? '1' : '0';
    binByte2Stp  = binByte2Stp.slice(0,6) + bit + binByte2Stp.slice(7);
    setByteCheckBoxes(byte2StpCheckBoxContainer, binByte2Stp);
    updateInputSetup();
});

const cBoxSetupByte2Bit2 = document.getElementById('setup-byte2-bit2');
cBoxSetupByte2Bit2.addEventListener('change', (e)=>{
    let bit = e.target.checked ? '1' : '0';
    binByte2Stp  = binByte2Stp.slice(0,5) + bit + binByte2Stp.slice(6);
    setByteCheckBoxes(byte2StpCheckBoxContainer, binByte2Stp);
    updateInputSetup();
});

const cBoxSetupByte2Bit3 = document.getElementById('setup-byte2-bit3');
cBoxSetupByte2Bit3.addEventListener('change', (e)=>{
    let bit = e.target.checked ? '1' : '0';
    binByte2Stp  = binByte2Stp.slice(0,4) + bit + binByte2Stp.slice(5);
    setByteCheckBoxes(byte2StpCheckBoxContainer, binByte2Stp);
    updateInputSetup();
});

const cBoxSetupByte2Bit4 = document.getElementById('setup-byte2-bit4');
cBoxSetupByte2Bit4.addEventListener('change', (e)=>{
    let bit = e.target.checked ? '1' : '0';
    binByte2Stp  = binByte2Stp.slice(0,3) + bit + binByte2Stp.slice(4);
    setByteCheckBoxes(byte2StpCheckBoxContainer, binByte2Stp);
    updateInputSetup();
});


const cBoxSetupByte2Bit6 = document.getElementById('setup-byte2-bit6');
cBoxSetupByte2Bit6.addEventListener('change', (e)=>{
    let bit = e.target.checked ? '1' : '0';
    binByte2Stp  = binByte2Stp.slice(0,1) + bit + binByte2Stp.slice(2);
    setByteCheckBoxes(byte2StpCheckBoxContainer, binByte2Stp);
    updateInputSetup();
});