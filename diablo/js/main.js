//create container + important informations
$(document.body).html(getContainer());
$('.container').append(getImportant());

for (i = 0; i < importantItems.length; i++) {
	$('.important-info').append(importantItems[i]);
}

//loop through all classes, create their header
for (i = 0; i < classes.length; i++) {
	$('.container').append(getClass(classes[i], builds[i]));
}

//BARBARIAN
var cubeBarb = [hexingPants, taskerAndTheo, theFurnace, lamentation, obsidianRingOfTheZodiac, RingOfRoyalGrandeur];
var cubeWearBarb = [unity];
var wearBarb = [immortalKingSet, ancientParthanDefenders, theGravelOfJudgement, strongarmBracers, lacuniProwlers, bulKathosSet, conventionOfElements, focusRestraintSet, prideOfCassius];
appendClass(0, cubeBarb, cubeWearBarb, wearBarb);

//CRUSADER
var cubeCrus = [hexingPants, leoricCrown, obsidianRingOfTheZodiac];
var cubeWearCrus = [theFurnace];
var wearCrus = [rolandSet, bloodBrother, skywarden, goldenFlense, denial, thundergodVigor, stringOfEars, theWitchingHour, vigilanteBelt, unity, conventionOfElements];
appendClass(1, cubeCrus, cubeWearCrus, wearCrus);

//DEMON HUNTER
var cubeDH = [thunderfury, leoricCrown, hexingPants, cindercoat, RingOfRoyalGrandeur, conventionOfElements];
var cubeWearDH = [calamity];
var wearDH = [unhallowedEssenceSet, deadManLegacy, natalyaSet, balefireCaster, focusRestraintSet, theWitchingHour, crashingRain];
appendClass(2, cubeDH, cubeWearDH, wearDH);

//MONK
var cubeMonk = [flyingDragon, obsidianRingOfTheZodiac, unity];
var cubeWearMonk = [leoricCrown, cindercoat, depthDiggers, spiritGuards];
var wearMonk = [raimentSet, mageFist, eyeOfPeshkov, strongarmBracers, shenlongSet, innaSet, theCrudestBoots, stringOfEars, focusRestraintSet, thundergodVigor, vigilanteBelt];
appendClass(3, cubeMonk, cubeWearMonk, wearMonk);

//WITCH DOCTOR
var cubeWD = [starmetalKukri, maskOfJeram, theGrinReaper, theFurnace, RingOfRoyalGrandeur];
var cubeWearWD = [];
var wearWD = [zunimassaSet, helltoothSet, aughildShoulders, aughildBracers, carnevil, thingOfTheDeep, daggerOfDarts, theWitchingHour, focusRestraintSet, beltOfTranscendence];
appendClass(4, cubeWD, cubeWearWD, wearWD);

//WIZARD
var cubeWiz = [theFurnace, cindercoat, theGrandVizier, taskerAndTheo, RingOfRoyalGrandeur];
var cubeWearWiz = [nilfurBoast, crownOfThePrimus, aetherWalker];
var wearWiz = [sunKeeper, gestureOfOrpheus, strongarmBracers, ranslorFolly, serpentSparker, ancientParthanDefenders, talRashaSet, delsereSet, focusRestraintSet];
appendClass(5, cubeWiz, cubeWearWiz, wearWiz);