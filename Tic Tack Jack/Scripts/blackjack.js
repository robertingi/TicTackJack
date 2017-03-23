// Smiður fyrir spil
function Card(rank, suit)
{
	this.rank = rank; // Gildi spils
	this.suit = suit; // Sort spils
	this.createNode = cardCreateNode; // Nóða fyrir spil
}

// Nóða sem skilar <div> tagi sem birtir spil á vefsíðu
function cardCreateNode()
{
	// Breytur fyrir fallið
	var cardNode, frontNode, indexNode, spotNode, tempNode, textNode;
	var indexStr, spotChar;

	// <div> tag fyrir spil.
	cardNode = document.createElement("div");
	cardNode.className = "card";

	// <div> fyrir framhlið spils.
	frontNode = document.createElement("div");
	frontNode.className = "front";

	// Stafur, litur og sort spils.
	spotChar = "\u00a0";
	switch (this.suit)
	{
		case "H" : // Hjarta
			frontNode.className += " red";
			spotChar = "\u2665";
		break;
		case "S" : // Spaði
			spotChar = "\u2660";
		break;
		case "D" : // Tígull
			frontNode.className += " red";
			spotChar = "\u2666";
		break;
		case "C" : // Lauf
			spotChar = "\u2663";
		break;
	}

	// Merkja spil upp í vinstra horn <div> svæðisins.
	indexStr = this.rank;
	if (this.toString() == "")
		indexStr = "\u00a0";
	spotNode = document.createElement("DIV");
	spotNode.className = "index";
	textNode = document.createTextNode(indexStr);
	spotNode.appendChild(textNode);
	spotNode.appendChild(document.createElement("BR"));
	textNode = document.createTextNode(spotChar);
	spotNode.appendChild(textNode);
	frontNode.appendChild(spotNode);

	// Framhlið spils.
	cardNode.appendChild(frontNode);

	// Skila spili.
	return cardNode;
}

// Smiður fyrir spilastokk
function Stack()
{
	// Tómt fylki fyrir spil.
	this.cards = new Array();

	this.makeDeck  = stackMakeDeck;
	this.shuffle   = stackShuffle;
	this.deal      = stackDeal;
	this.cardCount = stackCardCount;
}

// Smiður fyrir stokk með 'n' fjölda af spilastokkum
function stackMakeDeck(n)
{
	var ranks = new Array("A", "2", "3", "4", "5", "6", "7", "8", "9",
						  "10", "J", "Q", "K");
	var suits = new Array("C", "D", "H", "S");
	var i, j, k;
	var m;

	m = ranks.length * suits.length;

	this.cards = new Array(n * m);

	// Fylla fylkið af spilum í 'n' fjölda af spilastokkum.
	for (i = 0; i < n; i++)
		for (j = 0; j < suits.length; j++)
			for (k = 0; k < ranks.length; k++)
				this.cards[i * m + j * ranks.length + k] = new Card(ranks[k], suits[j]);
}

// Stokka spil
function stackShuffle(n)
{
	var i, j, k;
	var temp;

	// Stokka 'n' sinnum.
	for (i = 0; i < n; i++)
		for (j = 0; j < this.cards.length; j++)
		{
			k = Math.floor(Math.random() * this.cards.length);
			temp = this.cards[j];
			this.cards[j] = this.cards[k];
			this.cards[k] = temp;
		}
}

// Gefa spil
function stackDeal()
{
	if (this.cards.length > 0)
		return this.cards.shift();
	else
		return null;
}

// Talning spila í stokki
function stackCardCount()
{
	return this.cards.length;
}

// Fastar.
var numPacks = 4; // Fjöldi spilastokka.
var numShuffles = 10; // Hversu oft er stokkað.
var initCredit = 1000; // Upphafleg inneign leikmanna.
var dealTimeDelay = 250; // Bið milli gefna spila.
var count = 30; // 30 sek teljari fyrir aðgerðir leikmanna.

// Víðværar breytur (Globals).
var addPlayer = 0; // Bæta við leikmanni
var seats = 7; // Sæti við borðið
var sitting = 0; // Hversu margir sitja við borðið
var deck; // Stokkur.
var burnCard; // Brenna spil.
var dealer; // Gjafari.
var player = new Array(addPlayer); // Fylki leikmanna.
var curPlayer; // Virkur leikmaður.
var betTimeout, hitTimeout; // Teljarar.
var dealRoundCounter; // Talning fyrir gefin spil.

// Upphæðir sem leikmenn leggja undir.
var betting, player0Credits, player1Credits, player2Credits, player3Credits,
	player4Credits, player5Credits, player6Credits;
// Birta upphæðir sem leikmenn leggja undir.
var bettingTextNode, player0CreditsTextNode, player1CreditsTextNode, player2CreditsTextNode,
	player3CreditsTextNode, player4CreditsTextNode, player5CreditsTextNode, player6CreditsTextNode;

// Nöfn leikmanna
var player0Name, player1Name, player2Name, player3Name, player4Name, player5Name, player6Name;
	
// Birta leikinn þegar gluggi opnast.
window.onload = initGame;

// Leikurinn búinn til.
function initGame()
{
	var i;
	// Leikmaður sest við borðið.
	addPlayer++;
	sitting++;
	
	// Finna veðmáls textabox á síðunni.
	bettingTextNode = document.getElementById("betting").firstChild;
	player0CreditsTextNode = document.getElementById("player0Credits").firstChild;
	player1CreditsTextNode = document.getElementById("player1Credits").firstChild;
	player2CreditsTextNode = document.getElementById("player2Credits").firstChild;
	player3CreditsTextNode = document.getElementById("player3Credits").firstChild;
	player4CreditsTextNode = document.getElementById("player4Credits").firstChild;
	player5CreditsTextNode = document.getElementById("player5Credits").firstChild;
	player6CreditsTextNode = document.getElementById("player6Credits").firstChild;
	
	// Upphafsstillir fyrir inneignir leikmanna.
	player0Credits = initCredit;
	player1Credits = initCredit;
	player2Credits = initCredit;
	player3Credits = initCredit;
	player4Credits = initCredit;
	player5Credits = initCredit;
	player6Credits = initCredit;

	// Spyrja leikmann að nafni.
	player0Name = prompt("Nafn:");
	if (player0Name != null)
		document.getElementById("player0Name").innerHTML = player0Name;
	else
		document.getElementById("player0Name").innerHTML = "Leikmaður 1";
	
	// Upphafsstilla fyrsta leikmann.
	betting = 0;
	curPlayer = 0;
	changeBet(0);
	updateBetDisplay(0);

	// Búa til spilastokk.
	deck = new Stack();
	newDeck();

	// Búa til sæti gjafara og leikmanna.
	dealer = new Hand("dealer");
	for (i = 0; i < seats; i++)
		player[i] = new Hand("player" + i);
		
	// Merkja glugga fyrsta leikmanns.
	addClassName(player[0].fieldNode, "activeField");

	// Teljari fyrir veðmál fyrsta leikmanns.
	betTimeout = setInterval(betCounter,1000);
}

// Nýr leikmaður sest við borðið.
function sit()
{
	if (sitting == 1) // Ef einn leikmaður situr við borðið.
	{
		sitting++; // Bæta við öðrum.
		player1Name = prompt("Nafn: (Þú byrjar í næstu umferð)"); // Spyrja um nafn.
		if (player1Name != null)
			document.getElementById("player1Name").innerHTML = player1Name;
		else
			document.getElementById("player1Name").innerHTML = "Leikmaður 2";
	}
	else if (sitting == 2)
	{
		sitting++;
		player2Name = prompt("Nafn: (Þú byrjar í næstu umferð)");
		if (player2Name != null)
			document.getElementById("player2Name").innerHTML = player2Name;
		else
			document.getElementById("player2Name").innerHTML = "Leikmaður 3";
	}
	else if (sitting == 3)
	{
		sitting++;
		player3Name = prompt("Nafn: (Þú byrjar í næstu umferð)");
		if (player3Name != null)
			document.getElementById("player3Name").innerHTML = player3Name;
		else
			document.getElementById("player3Name").innerHTML = "Leikmaður 4";
	}
	else if (sitting == 4)
	{
		sitting++;
		player4Name = prompt("Nafn: (Þú byrjar í næstu umferð)");
		if (player4Name != null)
			document.getElementById("player4Name").innerHTML = player4Name;
		else
			document.getElementById("player4Name").innerHTML = "Leikmaður 5";
	}
	else if (sitting == 5)
	{
		sitting++;
		player5Name = prompt("Nafn: (Þú byrjar í næstu umferð)");
		if (player5Name != null)
			document.getElementById("player5Name").innerHTML = player5Name;
		else
			document.getElementById("player5Name").innerHTML = "Leikmaður 6";
	}
	else if (sitting == 6)
	{
		sitting++;
		player6Name = prompt("Nafn: (Þú byrjar í næstu umferð)");
		if (player6Name != null)
			document.getElementById("player6Name").innerHTML = player6Name;
		else
			document.getElementById("player6Name").innerHTML = "Leikmaður 7";
	}
	else
	{
		window.alert("Borðið er fullt");
	}
}

// Breyta upphæð fyrir veðmál.
function changeBet(n)
{
	if (n == 0)
		betting = n; // Núllstilla upphæð.
	else
		betting += n; // Hækka upphæð.
	
	// Birta upphæð í textaboxi.
	bettingTextNode.nodeValue = "Upphæð: " + ISK(betting);
}

// Uppfæra veðmál og inneign leikmanns 'n'.
function updateBetDisplay(n)
{
	var string;

	// Birta veðmál leikmanns 'n'.
	if (player[n])
	{
		if (player[n].bet != null)
			string = "Veðmál: " + ISK(player[n].bet);
		else
			string = "\u00a0";
		player[n].betTextNode.nodeValue = string;
	}

	// Birta inneign leikmanna.
	if(n == 0)
		player0CreditsTextNode.nodeValue = "Inneign: " + ISK(player0Credits);
	else if(n == 1)
		player1CreditsTextNode.nodeValue = "Inneign: " + ISK(player1Credits);
	else if(n == 2)
		player2CreditsTextNode.nodeValue = "Inneign: " + ISK(player2Credits);
	else if(n == 3)
		player3CreditsTextNode.nodeValue = "Inneign: " + ISK(player3Credits);
	else if(n == 4)
		player4CreditsTextNode.nodeValue = "Inneign: " + ISK(player4Credits);
	else if(n == 5)
		player5CreditsTextNode.nodeValue = "Inneign: " + ISK(player5Credits);
	else
		player6CreditsTextNode.nodeValue = "Inneign: " + ISK(player6Credits);
}

// Teljari fyrir upphæð á veðmáli leikmanns.
function betCounter()
{
	count = count - 1;
	if (count < 0)
	{
		clearInterval(betTimeout);
		count = 30;
		makeBet();
	}
	document.getElementById("counter").innerHTML = count + " sek";
}

// Teljari fyrir upphæð á veðmáli leikmanns.
function hitCounter()
{
	count = count - 1;
	if (count < 0)
	{
		clearInterval(hitTimeout);
		count = 30;
		playerStand();
	}
	document.getElementById("counter").innerHTML = count + " sek";
}

// Leggja undir upphæð fyrir hendi.
function makeBet()
{
	clearInterval(betTimeout); // Stoppa teljara.
	if(curPlayer == 0)
	{
		// Ef veðmál er hærra en inneign, þá er öll inneign lögð undir og enginn afgangur.
		if(betting > player0Credits)
		{
			player[curPlayer].bet = player0Credits;
			player0Credits = 0;
		}
		else
		{
			player[curPlayer].bet = betting; // Flytja upphæð í veðmál.
			player0Credits -= player[curPlayer].bet; // Draga upphæð frá inneign.
		}
		nextPlayer();
	}
	else if(curPlayer == 1)
	{
		if(betting > player1Credits)
		{
			player[curPlayer].bet = player1Credits;
			player1Credits = 0;
		}
		else
		{
			player[curPlayer].bet = betting;
			player1Credits -= player[curPlayer].bet;
		}
		nextPlayer();
	}
	else if(curPlayer == 2)
	{
		if(betting > player2Credits)
		{
			player[curPlayer].bet = player2Credits;
			player2Credits = 0;
		}
		else
		{
			player[curPlayer].bet = betting;
			player2Credits -= player[curPlayer].bet;
		}
		nextPlayer();
	}
	else if(curPlayer == 3)
	{
		if(betting > player0Credits)
		{
			player[curPlayer].bet = player3Credits;
			player3Credits = 0;
		}
		else
		{
			player[curPlayer].bet = betting;
			player3Credits -= player[curPlayer].bet;
		}
		nextPlayer();
	}
	else if(curPlayer == 4)
	{
		if(betting > player0Credits)
		{
			player[curPlayer].bet = player4Credits;
			player4Credits = 0;
		}
		else
		{
			player[curPlayer].bet = betting;
			player4Credits -= player[curPlayer].bet;
		}
		nextPlayer();
	}
	else if(curPlayer == 5)
	{
		if(betting > player0Credits)
		{
			player[curPlayer].bet = player5Credits;
			player5Credits = 0;
		}
		else
		{
			player[curPlayer].bet = betting;
			player5Credits -= player[curPlayer].bet;
		}
		nextPlayer();
	}
	else
	{
		if(betting > player6Credits)
		{
			player[curPlayer].bet = player6Credits;
			player6Credits = 0;
		}
		else
		{
			player[curPlayer].bet = betting;
			player6Credits -= player[curPlayer].bet;
		}
		nextPlayer();
	}
}

// Næsti leikmaður leggur undir.
function nextPlayer()
{
	// Ef það eru ekki fleiri leikmenn við borðið.
	if(curPlayer == (addPlayer - 1))
	{
		updateBetDisplay(curPlayer); // Birta upplýsingarnar í reitum leikmanns.
		removeClassName(player[curPlayer].fieldNode, "activeField"); // Fjarlægja merkingu leikmanns.
		startRound(); // Hefja leik
	}
	else
	{
		updateBetDisplay(curPlayer); // Birta upplýsingarnar í reitum leikmanns.
		removeClassName(player[curPlayer].fieldNode, "activeField"); // Fjarlægja merkingu leikmanns.
		curPlayer++; // Næsti leikmaður
		updateBetDisplay(curPlayer);
		addClassName(player[curPlayer].fieldNode, "activeField"); // Merkja leikmann.
		changeBet(0); // Núllstilla upphæð.
		bettingTextNode.nodeValue = "Upphæð: " + ISK(betting); // Birta upphæð = 0
		count = 30; // Endurstilla teljara.
		betTimeout = setInterval(betCounter,1000); // Byrja teljara.
	}
}

function startRound()
{

	// Fela veðmáls takka.
	bet1.style.display = "none";
	bet5.style.display = "none";
	bet10.style.display = "none";
	bet50.style.display = "none";
	clear.style.display = "none";
	deal.style.display = "none";

	// Ef það er komið að brenndu spili, þá kemur nýr stokkur.
	if (deck.cardCount() < burnCard)
	{
		newDeck();
	}

	// Gefa spil.
	dealRoundCounter = 1;
	dealRound();
}

function dealRound()
{
	// Gefa spil til leikmanns eða gjafara miðað við teljara.
	switch(dealRoundCounter)
	{
		case 1:
			player[0].addCard(getNextCard(), false);
		break;
		case 2:
			player[1].addCard(getNextCard(), false);
		break;
		case 3:
			player[2].addCard(getNextCard(), false);
		break;
		case 4:
			player[3].addCard(getNextCard(), false);
		break;
		case 5:
			player[4].addCard(getNextCard(), false);
		break;
		case 6:
			player[5].addCard(getNextCard(), false);
		break;
		case 7:
			player[6].addCard(getNextCard(), false);
		break;
		case 8:
			dealer.addCard(getNextCard(), true);
		break;
		case 9:
			player[0].addCard(getNextCard(), false);
		break;
		case 10:
			player[1].addCard(getNextCard(), false);
		break;
		case 11:
			player[2].addCard(getNextCard(), false);
		break;
		case 12:
			player[3].addCard(getNextCard(), false);
		break;
		case 13:
			player[4].addCard(getNextCard(), false);
		break;
		case 14:
			player[5].addCard(getNextCard(), false);
		break;
		case 15:
			player[6].addCard(getNextCard(), false);
		break;
		case 16:
			dealer.addCard(getNextCard(), false);
		break;
		default:

		curPlayer = 0; // Merkja fyrsta leikmann
		playRound(); // Spila umferð
		return;
		break;
	}

	// Uppfæra stig leikmanns.
	var i;
	for(i = 0; i < addPlayer; i++)
	{
		if (player[i].getScore() == 21)
		{
			player[i].blackjack = true; // Leikmaður fær Blackjack.
			player[i].scoreTextNode.nodeValue = "Blackjack"; // Skrifa Blackjack í reit leikmanns.
		}
		else
			player[i].scoreTextNode.nodeValue = player[i].getScore(); // Birta stig leikmanns.
	}
	
	// Hækka talningu spila miðað við fjölda leikmanna.
	if ((dealRoundCounter == addPlayer) && (dealRoundCounter < 7))
		dealRoundCounter = 7;
	else if (dealRoundCounter == (8 + addPlayer))
		dealRoundCounter = 15;
	dealRoundCounter++;
	// Gefa næsta spil.
	setTimeout(dealRound, dealTimeDelay);
}

function playRound()
{
	// Athuga hvort gjafari sé með Blackjack.
	if (dealer.getScore() == 21)
	{
		dealer.blackjack = true;
		dealer.scoreTextNode.nodeValue = "Blackjack";
	}
	
	// Ef gjafari er með Blackjack þá er umferðin búin.
	if (dealer.blackjack)
	{
		endRound();
		return;
	}
	
	// Ef fyrsti leikmaður er með Blackjack
	else if (player[0].blackjack)
	{
		// Birta Gefa/Stoppa takka.
		stand.style.display = "";
		hit.style.display = "";
		// Leikmaður stoppar.
		playerStand();
		return;
	}
  
	// Birta Gefa/Stoppa takka.
	stand.style.display = "";
	hit.style.display = "";
	
	// Endurstilla teljara og merkja leikmann.
	count = 30;
	hitTimeout = setInterval(hitCounter,1000);
	addClassName(player[curPlayer].fieldNode, "activeField");
}

// Leikmaður biður um spil.
function playerHit()
{
	var n, p;

	// Gefa leikmanni spil og birta stig.
	n = curPlayer;
	player[n].addCard(getNextCard(), false);
	p = player[n].getScore();

	// Ef leikmaður springur er farið á næstu hendi.
	if (p > 21)
	{
		player[n].scoreTextNode.nodeValue =  "Sprunginn (" + p + ")";
		startNextHand();
		return;
	}
	// Ef leikmaður fær 21 er farið á næstu hendi.
	else if (p == 21)
	{
		player[n].scoreTextNode.nodeValue = p;
		startNextHand();
		return;
	}
	// Stig leikmanns eru birt.
	else
	{
		player[n].scoreTextNode.nodeValue = p;
	}
}

// Leikmaður stoppar.
function playerStand()
{
	// Farið á næstu hendi.
	startNextHand();
}

// Fall fyrir næstu hendi.
function startNextHand()
{
	// Afmerkja hendi.
	removeClassName(player[curPlayer].fieldNode, "activeField");
	clearInterval(hitTimeout); // Stoppa teljara.

	// Næsti leikmaður eða hendi.
	curPlayer++;
	// Ef allir leikmenn eru búnir er komið að gjafara.
	if (curPlayer >= addPlayer)
	{
		startDealer();
		return;
	}
	// Ef leikmaður er með blackjack er farið í næstu hendi.
	else if (player[curPlayer].blackjack)
		playerStand();
	// Merkja leikmann og byrja teljara.
	else
	{
		addClassName(player[curPlayer].fieldNode, "activeField");
		count = 30;
		hitTimeout = setInterval(hitCounter,1000);
	}
}

// Staðsetning spila
Hand.prototype.leftIncr  =  2.5;
Hand.prototype.topIncr   =  0.2;
Hand.prototype.rollEvery =  5;

// Hendi
function Hand(id)
{
	this.cards = new Array();

	// Sækja upplýsingar um ID af vefsíðu.
	this.fieldNode     = document.getElementById(id);
	this.cardsNode     = document.getElementById(id + "Cards");
	this.scoreTextNode = document.getElementById(id + "Score").firstChild;
	if (id != "dealer")
	{
		this.betTextNode    = document.getElementById(id + "Bet").firstChild;
		this.resultTextNode = document.getElementById(id + "Result").firstChild;
	}

	this.reset      = handReset;
	this.addCard    = handAddCard;
	this.getScore   = handGetScore;
	this.clearCards = handClearCards;

	this.reset();
}

// Endurstilla hendi
function handReset()
{
	// Fjarlæga spil og núllstilla breytur.
	this.clearCards();

	this.cards     = new Array();
	this.blackjack = false;
	this.left      = 0;
	this.top       = 0;

	this.scoreTextNode.nodeValue  = "\u00a0";
	if (this.betTextNode)
	{
		this.betTextNode.parentNode.className = "textBox dollars";
		this.betTextNode.nodeValue = "\u00a0";
	}
	if (this.resultTextNode)
		this.resultTextNode.nodeValue = "\u00a0";
}

// Bæta við spili.
function handAddCard(card, down)
{
	var n;
	var node;

	// Bæta spili við hendi.
	n = this.cards.length;
	this.cards[n] = card;

	// Búa til <div> fyrir spil.
	node = this.cards[n].createNode();
	// Snúa spili niður.
	if (down)
		node.firstChild.style.visibility = "hidden";

	// Bæta spili á rétt svæði á vefsíðunni.
	node.style.left = this.left + "em";
	node.style.top  = this.top  + "em";
	this.cardsNode.appendChild(node);
	this.left += this.leftIncr;
	if (this.cards.length % this.rollEvery == 0)
		this.top = 0;
	else
		this.top += this.topIncr;
}

// Reikna stig.
function handGetScore()
{
	var i, total;
	total = 0;

	// Stig spila, þegar ás er talinn sem 1.
	for (i = 0; i < this.cards.length; i++)
		if (this.cards[i].rank == "A")
			total++;
		else
		{
			if (this.cards[i].rank == "J" || this.cards[i].rank == "Q" || this.cards[i].rank == "K")
				total += 10;
			else
				total += parseInt(this.cards[i].rank, 10);
		}

	// Hækka alla mögulega ása í 11.
	for (i = 0; i < this.cards.length; i++)
		if (this.cards[i].rank == "A" && total <= 11)
			total += 10;

	// Skila stigum.
	return total;
}

function handClearCards()
{
	// Fjarlægja spil.
	while (this.cardsNode.lastChild)
		this.cardsNode.removeChild(this.cardsNode.lastChild);
}

// Búa til stokk
function newDeck()
{
	deck.makeDeck(numPacks);
	deck.shuffle(numShuffles);

	// Merka brennt spil.
	burnCard = Math.round(Math.random() * 26) + 26;
}

// Sækja næsta spil.
function getNextCard()
{
	// Ef spilin eru búin, þá er gerður nýr stokkur.
	if (deck.cardCount() == 0)
	{
		newDeck();
	}

	return deck.deal();
}

// Gjafari gerir
function startDealer()
{
	var i, allBusts;

	// Fela takka.
 	hit.style.display = "none";
	stand.style.display = "none";

	// Ef allir leikmenn sprungu biður gjafari ekki um neitt spil.
	allBusts = true;
	for (i = 0; i < addPlayer; i++)
		if (player[i].getScore() <= 21)
			allBusts = false;
		if (allBusts)
		{
			endRound();
			return;
		}

	// Merkja hendi gjafara og gefa spil.
	addClassName(dealer.fieldNode, "activeField");
	dealer.cardsNode.firstChild.firstChild.style.visibility = "";
	dealer.scoreTextNode.nodeValue = dealer.getScore();
	setTimeout(playDealer, dealTimeDelay);
}

function playDealer()
{
	var d;

	// Birta stig gjafara.
	d = dealer.getScore();
	dealer.scoreTextNode.nodeValue = d;

	// Ef gjafari er undir sautján er honum gefið nýtt spil.
	if (d < 17)
	{
		setTimeout(dealToDealer, dealTimeDelay);
		return;
	}

	// Athuga hvort gjafari er sprunginn.
	if (d > 21)
		dealer.scoreTextNode.nodeValue = "Busted (" + d + ")";

	// Fjarlægja merkingu á gjafara.
	removeClassName(dealer.fieldNode, "activeField");
	endRound();
}

// Gefa gjafara spil
function dealToDealer()
{
	dealer.addCard(getNextCard(), false);
	playDealer();
}

// Umferð kláruð.
function endRound()
{
	var i, d, p, tmp;

	// Sýna spil og stig gjafara.
	dealer.cardsNode.firstChild.firstChild.style.visibility = "";
	d = dealer.getScore();
	if (!dealer.blackjack && d <= 21)
		dealer.scoreTextNode.nodeValue = d;

	// Sýna stig hvers leikmanns og gera upp veðmál.
	for (i = 0; i < addPlayer; i++)
	{
		p = player[i].getScore();
		if ((player[i].blackjack && !dealer.blackjack) || (p <= 21 && d > 21) || (p <= 21 && p > d))
		{
			player[i].resultTextNode.nodeValue = "Sigur!";
			tmp = 2 * player[i].bet;

			// Blackjack borgar 3 á móti 2.
			if (player[i].blackjack)
			tmp += player[i].bet / 2;

			player[i].bet = tmp;
			if(i == 0)
				player0Credits += player[i].bet;
			else if(i == 1)
				player1Credits += player[i].bet;
			else if(i == 2)
				player2Credits += player[i].bet;
			else if(i == 3)
				player3Credits += player[i].bet;
			else if(i == 4)
				player4Credits += player[i].bet;
			else if(i == 5)
				player5Credits += player[i].bet;
			else
				player6Credits += player[i].bet;
		}
		else if ((dealer.blackjack && !player[i].blackjack) || p > 21 || p < d)
		{
			player[i].resultTextNode.nodeValue = "Tap";
			addClassName(player[i].betTextNode.parentNode, "Tap");
		}
		else
		{
			player[i].resultTextNode.nodeValue = "Jafntefli";
			if(i == 0)
				player0Credits += player[i].bet;
			else if(i == 1)
				player1Credits += player[i].bet;
			else if(i == 2)
				player2Credits += player[i].bet;
			else if(i == 3)
				player3Credits += player[i].bet;
			else if(i == 4)
				player4Credits += player[i].bet;
			else if(i == 5)
				player5Credits += player[i].bet;
			else
				player6Credits += player[i].bet;
		}
    updateBetDisplay(i);
	}
	// Byrja nýja umferð eftir 5 sek.
	setTimeout(resetRound, 5000);
}

// Byrja nýja umferð.
function resetRound()
{
	var i;

	// Núllstilla gjafara og alla leikmenn.
	dealer.reset();
	for (i = 0; i < addPlayer; i++)
	{
		player[i].reset();
	}
	
	// Merkja fyrsta leikmann
	curPlayer = 0;
  	addClassName(player[0].fieldNode, "activeField");

	// Birta veðmáls takka.
	bet1.style.display = "";
	bet5.style.display = "";
	bet10.style.display = "";
	bet50.style.display = "";
	clear.style.display = "";
	deal.style.display = "";
	
	// Bæta við leikmönnum sem hafa sest við borðið.
	addPlayer = sitting;
	// Endursetja teljara.
	count = 30;
	betTimeout = setInterval(betCounter,1000);
}

// Birta veðmál í íslenskum krónum.
function ISK(n)
{
	var a, b;

	a = Math.abs(n);
	b = 100 * (a - Math.floor(a));
	if (b < 10)
		b = "0" + b;
	return (n < 0 ? "-" : "" ) + Math.floor(a) + " kr.";
}

// Merkja leikmann
function addClassName(el, name)
{
	// Fjarlæga nafn klasa af elementi ef það er nú þegar gefið upp.
	removeClassName(el, name);

	// Bæta við í klasa í element.
	if (el.className.length > 0)
		name = " " + name;
	el.className += name;
}

// Afmerkja leikmann
function removeClassName(el, name)
{
	// Ef element hefur engin nöfn á klösum er hætt.
	if (el.className == null)
		return;

	// Búa til fyrri klasanöfn elements en án viðkomandi klasanafns.
	var newList = new Array();
	var curList = el.className.split(" ");
	for (var i = 0; i < curList.length; i++)
		if (curList[i] != name)
			newList.push(curList[i]);
	el.className = newList.join(" ");
}