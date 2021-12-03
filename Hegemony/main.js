var form = document.getElementsByTagName("form")[0]

var resistance;
var nodeCount;
var defenderModifier = 0;
var ascendancy;
var initiatorModifier = 0;

function clamp(value, min, max)
{
    return Math.min(Math.max(value, min), max);
}

function updateModifier(which, how)
{
    switch (which + how)
    {
        case "defender--":
            defenderModifier = clamp(defenderModifier - 1, 0, 6);
            break;
        case "defender++":
            defenderModifier = clamp(defenderModifier + 1, 0, 6);
            break;
        case "initiator--":
            initiatorModifier = clamp(initiatorModifier - 1, 0, 6);
            break;
        case "initiator++":
            initiatorModifier = clamp(initiatorModifier + 1, 0, 6);
            break;
        default:
            break;
    }
    updateResult();
}

function updateResult()
{
    getGlobalValuesFromInputs();
    updateOutputs();
}

function getGlobalValuesFromInputs()
{
    resistance = parseInt(document.getElementById("resistanceInput").value);
    nodeCount = parseInt(document.getElementById("nodeCountInput").value);
    ascendancy = parseInt(document.getElementById("ascendancyInput").value);
}

function updateOutputs()
{
    updateItemOutputs();
    updateBaseRoll();
    updateBonus();
    updateFinalRoll();
}

function updateItemOutputs()
{
    form.resistanceOutput.value = resistance;
    form.nodeCountOutput.value = nodeCount;
    form.defenderModifierOutput.value = defenderModifier;
    form.ascendancyOutput.value = ascendancy;
    form.initiatorModifierOutput.value = initiatorModifier;
}

function updateBaseRoll()
{
    form.baseRoll.value = Math.max(1, resistance + nodeCount + defenderModifier + 1);
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

function getExpectedAttemptsString(roll)
{
    let expectedAttempts = {
        2: "1.2",
        3: "1.5",
        4: "2",
        5: "3",
        6: "6",
    }
    if (roll == 1 || roll >= 7)
    {
        return "";
    }
    return `(expected attempts: ${expectedAttempts[roll]})`;

}

function updateBonus()
{
    form.bonus.value = ascendancy + initiatorModifier;
}

function updateFinalRoll()
{
    form.finalRoll.value = Math.max(1, form.baseRoll.value - form.bonus.value);
    form.finalOdds.value = getProbabilityString(form.finalRoll.value);
    form.expectedAttempts.value = getExpectedAttemptsString(form.finalRoll.value);
}