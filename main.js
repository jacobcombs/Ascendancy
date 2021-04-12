var form = document.getElementById("form");

var resistanceInput = document.getElementById("resistanceInput");
var nodeCountInput = document.getElementById("nodeCountInput");
var ascendancyInput = document.getElementById("ascendancyInput");
var modifierInput = document.getElementById("modifier");

var resistance = parseInt(resistanceInput.value);
var nodeCount = parseInt(nodeCountInput.value);
var ascendancy = parseInt(ascendancyInput.value);
var modifier = parseInt(modifierInput.value);

function updateResistance()
{
    resistance = parseInt(resistanceInput.value);
    form.resistanceOutput.value = resistance;
    updateBaseRoll();
}

function updateNodeCount()
{
    nodeCount = parseInt(nodeCountInput.value);
    form.nodeCountOutput.value = nodeCount;
    updateBaseRoll();
}

function updateAscendancy()
{
    ascendancy = parseInt(ascendancyInput.value);
    form.ascendancyOutput.value = ascendancy;
    updateBonus();
}

function updateModifier()
{
    modifier = parseInt(modifierInput.value);
    updateBonus();
}

function updateBaseRoll()
{
    form.baseRoll.value = resistance + nodeCount + 1;
    updateFinalRoll();
}

function updateBonus()
{
    form.bonus.value = ascendancy + modifier;
    updateFinalRoll();
}

function updateFinalRoll()
{
    form.finalRoll.value = resistance + nodeCount + 1 - ascendancy - modifier;
}