    var state = "rotate";
    var image = [["","","","",""],["","","","",""],["","","","",""],["","","","",""],["","","","",""]]
    var start = [["","","","",""],["","","","",""],["","","","",""],["","","","",""],["","","","",""]]
    var result = [["", "", "", "", ""], ["", "", "", "", ""], ["", "", "", "", ""], ["", "", "", "", ""], ["", "", "", "", ""]];
    var code = [[["", "", "", ""], ["", "", "", ""], ["", "", "", ""], ["", "", "", ""], ["", "", "", ""]],
               [["", "", "", ""], ["", "", "", ""], ["", "", "", ""], ["", "", "", ""], ["", "", "", ""]],
               [["", "", "", ""], ["", "", "", ""], ["", "", "", ""], ["", "", "", ""], ["", "", "", ""]],
               [["", "", "", ""], ["", "", "", ""], ["", "", "", ""], ["", "", "", ""], ["", "", "", ""]],
               [["", "", "", ""], ["", "", "", ""], ["", "", "", ""], ["", "", "", ""], ["", "", "", ""]]];

    function blink(item) {
      item.classList.add("alert");
      setTimeout(function() {blink2(item) }, 300);
    };

    function blink2(item) {
      item.classList.remove("alert");
    };

    function joinSubArrays(ar) {
        var str = '';
        for (var i = 0, len = ar.length; i < len; i++) {
            str += ar[i].join("");
        }
        return str;
    };

    function set_result() {
      document.getElementById("result_field").innerHTML = joinSubArrays(result);
    };

    function set_pipe_image(item, row, cell) {
      if (!image[row][cell] == "") {
        item.src = ("http://d1.endata.cx/data/games/62478/" + image[row][cell] + ".png");

        switch(true)
        {
            case !code[row][cell][0] == "" && start[row][cell] == "s1" :
              item.classList.add(start[row][cell]);
              break;
            case !code[row][cell][1] == "" && start[row][cell] == "s2" :
              item.classList.add(start[row][cell]);
              break;
            case !code[row][cell][2] == "" && start[row][cell] == "s3" :
              item.classList.add(start[row][cell]);
              break;
            case !code[row][cell][3] == "" && start[row][cell] == "s4" :
              item.classList.add(start[row][cell]);
              break;
            default :
              switch(true)
              {
                case !code[row][cell][0] == "" :
                  item.classList.add("s1");
                  break;
                case !code[row][cell][1] == "" :
                  item.classList.add("s2");
                  break;
                case !code[row][cell][2] == "" :
                  item.classList.add("s3");
                  break;
                case !code[row][cell][3] == "" :
                  item.classList.add("s4");
                  break;
                default :
                  break;
              };
        };
      };
    };

    function rotate(item, row, cell){
      if (state == "rotate") {
        if (!item.classList.contains('choosed')) {
          if (item.classList.contains('s1')) {
            item.classList.remove("s1");
            switch(true)
            {
              case !code[row][cell][1] == "" :
                item.classList.add("s2");
                break;
              case !code[row][cell][2] == "" :
                item.classList.add("s3");
                break;
              case !code[row][cell][3] == "" :
                item.classList.add("s4");
                break;
              case !code[row][cell][0] == "" :
                item.classList.add("s1");
                break;
            };
          } else if (item.classList.contains('s2')) {
            item.classList.remove("s2");
            switch(true)
            {
              case !code[row][cell][2] == "" :
                item.classList.add("s3");
                break;
              case !code[row][cell][3] == "" :
                item.classList.add("s4");
                break;
              case !code[row][cell][0] == "" :
                item.classList.add("s1");
                break;
              case !code[row][cell][1] == "" :
                item.classList.add("s2");
                break;
            };
          } else if (item.classList.contains('s3')) {
            item.classList.remove("s3");
            switch(true)
            {
              case !code[row][cell][3] == "" :
                item.classList.add("s4");
                break;
              case !code[row][cell][0] == "" :
                item.classList.add("s1");
                break;
              case !code[row][cell][1] == "" :
                item.classList.add("s2");
                break;
              case !code[row][cell][2] == "" :
                item.classList.add("s3");
                break;
            };
          } else if (item.classList.contains('s4')) {
            item.classList.remove("s4");
            switch(true)
            {
              case !code[row][cell][0] == "" :
                item.classList.add("s1");
                break;
              case !code[row][cell][1] == "" :
                item.classList.add("s2");
                break;
              case !code[row][cell][2] == "" :
                item.classList.add("s3");
                break;
              case !code[row][cell][3] == "" :
                item.classList.add("s4");
                break;
            };
          };
        } else {
          blink(item);
        };
      };
    };

    function choose(item, row, cell){
      if (state == "choose") {
        if (item.classList.contains('choosed')) {
          item.classList.remove("choosed");
          result[row][cell] = "";
        } else {
          item.classList.add("choosed");

          if (item.classList.contains('s1')) {
            var s_id = 0;
          } else if (item.classList.contains('s2')) {
            var s_id = 1;
          } else if (item.classList.contains('s3')) {
            var s_id = 2;
          } else if (item.classList.contains('s4')) {
            var s_id = 3;
          };

          result[row][cell] = code[row][cell][s_id];
        };
      };
    };

    function set_rotate() {
      if (state == "choose") {
        state = "rotate"
        rotate_link = document.getElementById("rotate");
        choose_link = document.getElementById("choose");
        rotate_link.classList.add("active");
        choose_link.classList.remove("active");
      };
    };

    function set_choose() {
      if (state == "rotate") {
        state = "choose"
        rotate_link = document.getElementById("rotate");
        choose_link = document.getElementById("choose");
        choose_link.classList.add("active");
        rotate_link.classList.remove("active");
      };
    };

    function contentLoaded(win, fn) {
      var done = false, top = true,

      doc = win.document,
      root = doc.documentElement,
      modern = doc.addEventListener,

      add = modern ? 'addEventListener' : 'attachEvent',
      rem = modern ? 'removeEventListener' : 'detachEvent',
      pre = modern ? '' : 'on',

      init = function(e) {
        if (e.type == 'readystatechange' && doc.readyState != 'complete') return;
        (e.type == 'load' ? win : doc)[rem](pre + e.type, init, false);
        if (!done && (done = true)) fn.call(win, e.type || e);
      },

      poll = function() {
        try { root.doScroll('left'); } catch(e) { setTimeout(poll, 50); return; }
        init('poll');
      };

      if (doc.readyState == 'complete') fn.call(win, 'lazy');
      else {
        if (!modern && root.doScroll) {
          try { top = !win.frameElement; } catch(e) { }
          if (top) poll();
        }
        doc[add](pre + 'DOMContentLoaded', init, false);
        doc[add](pre + 'readystatechange', init, false);
        win[add](pre + 'load', init, false);
      }
    };

    contentLoaded(window, function() {
      set_pipe_image(document.getElementById("p00"),0,0);
      set_pipe_image(document.getElementById("p01"),0,1);
      set_pipe_image(document.getElementById("p02"),0,2);
      set_pipe_image(document.getElementById("p03"),0,3);
      set_pipe_image(document.getElementById("p04"),0,4);

      set_pipe_image(document.getElementById("p10"),1,0);
      set_pipe_image(document.getElementById("p11"),1,1);
      set_pipe_image(document.getElementById("p12"),1,2);
      set_pipe_image(document.getElementById("p13"),1,3);
      set_pipe_image(document.getElementById("p14"),1,4);

      set_pipe_image(document.getElementById("p20"),2,0);
      set_pipe_image(document.getElementById("p21"),2,1);
      set_pipe_image(document.getElementById("p22"),2,2);
      set_pipe_image(document.getElementById("p23"),2,3);
      set_pipe_image(document.getElementById("p24"),2,4);

      set_pipe_image(document.getElementById("p30"),3,0);
      set_pipe_image(document.getElementById("p31"),3,1);
      set_pipe_image(document.getElementById("p32"),3,2);
      set_pipe_image(document.getElementById("p33"),3,3);
      set_pipe_image(document.getElementById("p34"),3,4);

      set_pipe_image(document.getElementById("p40"),4,0);
      set_pipe_image(document.getElementById("p41"),4,1);
      set_pipe_image(document.getElementById("p42"),4,2);
      set_pipe_image(document.getElementById("p43"),4,3);
      set_pipe_image(document.getElementById("p44"),4,4);
    });
