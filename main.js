var form = document.getElementById("form");

var resistance;
var nodeCount;
var theirModifier;
var ascendancy;
var myModifier;

function updateResult()
{
    getGlobalValuesFromInputs();
    updateOutputs();
}

function getGlobalValuesFromInputs()
{
    resistance = parseInt(document.getElementById("resistanceInput").value);
    nodeCount = parseInt(document.getElementById("nodeCountInput").value);
    theirModifier = parseInt(document.getElementById("theirModifier").value);
    ascendancy = parseInt(document.getElementById("ascendancyInput").value);
    myModifier = parseInt(document.getElementById("myModifier").value);
}

function updateOutputs()
{
    updateSliderOutputs();
    updateBaseRoll();
    updateBonus();
    updateFinalRoll();
}

function updateSliderOutputs()
{
    form.resistanceOutput.value = resistance;
    form.nodeCountOutput.value = nodeCount;
    form.ascendancyOutput.value = ascendancy;
}

function updateBaseRoll()
{
    form.baseRoll.value = Math.max(1, resistance + nodeCount + theirModifier + 1);
    form.baseOdds.value = getProbabilityString(form.baseRoll.value);
}

function getProbabilityString(roll)
{
    let probabilities = {
        1: "1, 100%",
        2: "5/6, 83%",
        3: "2/3, 67%",
        4: "1/2, 50%",
        5: "1/3, 33%",
        6: "1/6, 17%",
        7: "0, 0%"
    }
    if (roll > 7)
    {
        return probabilities[7];
    }
    return probabilities[roll];
}

function updateBonus()
{
    form.bonus.value = ascendancy + myModifier;
}

function updateFinalRoll()
{
    form.finalRoll.value = Math.max(1, form.baseRoll.value - form.bonus.value);
    form.finalOdds.value = getProbabilityString(form.finalRoll.value);
}