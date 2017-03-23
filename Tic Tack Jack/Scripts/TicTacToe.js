    $(function () {
        var owner = '@Model.owner';
        var opp = '@Model.player2';
        var group = '@(Model.ID)';
        var hub = $.connection.gameHub;
        var myturn = true;

        function addPlayer(userName) {
            $("#Opponent").text(userName);
        }

        hub.client.cellClicked = function (cellId) {
            if ($("#" + cellId).text() != "X" && $("#" + cellId).text() != "O") {
                $("#Owner").text(owner);
                $("#Opponent").text(opp);
                $("#" + cellId).text("O");
                myturn = true;
                win();
            }
        };
        hub.client.clearClicked = function (clearID) {
            $("#clearstats").text("Opponent Cleared, New Game");
            clearGrid();
        };

        hub.client.endClicked = function () {
            $("statusT").text("Leik lokið!");
            closeGame();
        }

        $.connection.hub.start().done(function () {
            hub.server.join(group);
            hub.server.addPlayer(group, "@Model.player2");
                $("#Owner").text(owner);
                $("#Opponent").text(opp);

                $("#tictactoe tr td").click(function () {
                    if (myturn === true && win() === false && checkIfFull() === false) {
                        {
                            hub.server.clickCell(group, this.id);
                            if ($(this).text() != "X" && $(this).text() != "O") {
                                $(this).text("X");
                                myturn = false;
                                win();
                            }
                        }
                    }
                });
                $("#clear").click(function () {
                    hub.server.clickClear(group, "#clear");
                    $("#clearstats").text("New Game");
                    clearGrid();
                });
                $("#end").click(function () {
                    hub.server.clickEnd(group);
                    //closeGame();
                });
            });
    });


        function closeGame() {
            $("#clear").hide();
            $("#clearstats").hide();
            $("#end").hide();
            var ownerPoints = document.getElementById("ownerPoints");
            var oppPoints = document.getElementById("oppPoints");
            var ownerWins = parseInt(ownerPoints.innerHTML);
            var oppWins = parseInt(oppPoints.innerHTML);
            var ownerName = "@Model.owner";
            var oppName = "@Model.player2";
            var gameID = "@Model.ID";
        var url = '@Url.Action("TicTacToe", "Game")';
        if ("@WebSecurity.CurrentUserName" == ownerName) {
            $.post(url, { id: gameID, owner: ownerWins, opp: oppWins, oN: ownerName, oppN: oppName }, function (data) { });
        }
        myturn = false;
        $("#tictable").hide();
        var changeStatus = document.getElementById("statusT");
        changeStatus.innerHTML = "Leik lokið!";
    }

    function clearGrid()//hreinsar töflu (bara öðrum megin ATM)
    {
        var change;
        for (var nRow = 1; nRow < 4; nRow++) {
            for (var nColl = 1; nColl < 4; nColl++) {
                change = document.getElementById(nRow + "_" + nColl);
                change.innerHTML = "&nbsp;";
            }
        }
        var changeStatus = document.getElementById("statusT");
        changeStatus.innerHTML = "";
    }
    function checkX() //checkar hvort X hafi unnið
    {
        var one;
        var two;
        var three;


        one = document.getElementById("1_1");
        two = document.getElementById("1_2");
        three = document.getElementById("1_3");
        if (one.innerHTML === "X" && two.innerHTML === "X" && three.innerHTML === "X") {
            return true;
        }
        one = document.getElementById("2_1");
        two = document.getElementById("2_2");
        three = document.getElementById("2_3");
        if (one.innerHTML === "X" && two.innerHTML === "X" && three.innerHTML === "X") {
            return true;
        }
        one = document.getElementById("3_1");
        two = document.getElementById("3_2");
        three = document.getElementById("3_3");
        if (one.innerHTML === "X" && two.innerHTML === "X" && three.innerHTML === "X") {
            return true;
        }
        one = document.getElementById("1_1");
        two = document.getElementById("2_1");
        three = document.getElementById("3_1");
        if (one.innerHTML === "X" && two.innerHTML === "X" && three.innerHTML === "X") {
            return true;
        }
        one = document.getElementById("1_2");
        two = document.getElementById("2_2");
        three = document.getElementById("3_2");
        if (one.innerHTML === "X" && two.innerHTML === "X" && three.innerHTML === "X") {
            return true;
        }
        one = document.getElementById("1_3");
        two = document.getElementById("2_3");
        three = document.getElementById("3_3");
        if (one.innerHTML === "X" && two.innerHTML === "X" && three.innerHTML === "X") {
            return true;
        }
        one = document.getElementById("1_1");
        two = document.getElementById("2_2");
        three = document.getElementById("3_3");
        if (one.innerHTML === "X" && two.innerHTML === "X" && three.innerHTML === "X") {
            return true;
        }
        one = document.getElementById("3_1");
        two = document.getElementById("2_2");
        three = document.getElementById("1_3");
        if (one.innerHTML === "X" && two.innerHTML === "X" && three.innerHTML === "X") {
            return true;
        }
        return false;
    }
    function checkO() //checkar hvort O hafi unnið
    {
        var one;
        var two;
        var three;


        one = document.getElementById("1_1");
        two = document.getElementById("1_2");
        three = document.getElementById("1_3");
        if (one.innerHTML === "O" && two.innerHTML === "O" && three.innerHTML === "O") {
            return true;
        }
        one = document.getElementById("2_1");
        two = document.getElementById("2_2");
        three = document.getElementById("2_3");
        if (one.innerHTML === "O" && two.innerHTML === "O" && three.innerHTML === "O") {
            return true;
        }
        one = document.getElementById("3_1");
        two = document.getElementById("3_2");
        three = document.getElementById("3_3");
        if (one.innerHTML === "O" && two.innerHTML === "O" && three.innerHTML === "O") {
            return true;
        }
        one = document.getElementById("1_1");
        two = document.getElementById("2_1");
        three = document.getElementById("3_1");
        if (one.innerHTML === "O" && two.innerHTML === "O" && three.innerHTML === "O") {
            return true;
        }
        one = document.getElementById("1_2");
        two = document.getElementById("2_2");
        three = document.getElementById("3_2");
        if (one.innerHTML === "O" && two.innerHTML === "O" && three.innerHTML === "O") {
            return true;
        }
        one = document.getElementById("1_3");
        two = document.getElementById("2_3");
        three = document.getElementById("3_3");
        if (one.innerHTML === "O" && two.innerHTML === "O" && three.innerHTML === "O") {
            return true;
        }
        one = document.getElementById("1_1");
        two = document.getElementById("2_2");
        three = document.getElementById("3_3");
        if (one.innerHTML === "O" && two.innerHTML === "O" && three.innerHTML === "O") {
            return true;
        }
        one = document.getElementById("3_1");
        two = document.getElementById("2_2");
        three = document.getElementById("1_3");
        if (one.innerHTML === "O" && two.innerHTML === "O" && three.innerHTML === "O") {
            return true;
        }
        return false;
    }
    function win() //skilgreinir hvort/hver hafi unnið
    {
        var status = document.getElementById("statusT");
        var who = checkX();
        var what = checkO();
        var Upoints = document.getElementById("ownerPoints");
        var Opoints = document.getElementById("oppPoints");
        if (who === true) {
            //status.innerHTML = "WINNER";
            if ("@WebSecurity.CurrentUserName" == "@Model.owner") {
                    status.innerHTML = "@Model.owner vann!";
                    Upoints.innerHTML = 1 + parseInt(Upoints.innerHTML);
                }
                else {
                    status.innerHTML = "@Model.player2 vann!";
                    Opoints.innerHTML = 1 + parseInt(Upoints.innerHTML);
                }
                status.innerHTML = winner;
                return true;
            }
            else if (what === true) {
                if ("@WebSecurity.CurrentUserName" == "@Model.owner") {
                    status.innerHTML = "@Model.player2 vann!";
                    Opoints.innerHTML = 1 + parseInt(Upoints.innerHTML);
                }
                else {
                    status.innerHTML = "@Model.owner vann!";
                    Upoints.innerHTML = 1 + parseInt(Upoints.innerHTML);
                }
                return true;
            }
        return false;
    }
    function checkIfFull() {
        var checker;
        var counter = 0;
        var status = document.getElementById("statusT");
        for (var nRow = 1; nRow < 4; nRow++) {
            for (var nColl = 1; nColl < 4; nColl++) {
                checker = document.getElementById(nRow + "_" + nColl);
                if (checker === "X" && checker === "O") {
                    counter++;
                }
            }
        }
        if (counter === 9) {
            status.innerHTML = "DRAW";
            return true;
        }
        else {
            return false;
        }
    }