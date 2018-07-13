$(document).ready(function() {
  var option = [
    {
      question: 'What color is the French wine Beaujolais?',
      choice: ['Red', 'black', 'pink', 'purple'],
      answer: 0,
      photo:
        'https://www.google.ca/url?sa=i&source=images&cd=&cad=rja&uact=8&ved=2ahUKEwjAvJSJ_pncAhVn94MKHRZABhAQjRx6BAgBEAU&url=http%3A%2F%2Fwww.shenzhenparty.com%2Fnews%2Foutside-china%2F631461-french-wine-beaujolais&psig=AOvVaw1lf1TqUDCxB3Dq9IAkeZZI&ust=1531499417255790'
    },

    {
      question: 'Which country is the origin of the cocktail Mojito?',
      choice: ['Japan', 'Cuba', 'Korea', 'UK'],
      answer: 1,
      photo:
        'https://www.google.ca/url?sa=i&source=images&cd=&cad=rja&uact=8&ved=2ahUKEwjC-f7xvZrcAhUp4YMKHU89C7gQjRx6BAgBEAU&url=http%3A%2F%2Fyourtripto.com%2Fmojito-recipe-taste-from-cuba%2F&psig=AOvVaw0a4wzZW9wxFQkQcYOwW-Du&ust=1531516545424053'
    },

    {
      question: 'What is called a meal in open air?',
      choice: ['Dinner', 'Snacks', 'Picnic', 'Open air meal'],
      answer: 2,
      photo:
        'https://www.google.ca/url?sa=i&source=images&cd=&cad=rja&uact=8&ved=2ahUKEwi2p4ncvprcAhXL1IMKHeQ5DA8QjRx6BAgBEAU&url=https%3A%2F%2Fwww.innewyork.com%2Fblog%2Fdaily-nyc%2Fdine%2Ftisket-tasket-pre-packed-picnic-basket&psig=AOvVaw0sC7dip6KI7uuDsasIQ0p5&ust=1531516769852291'
    },

    {
      question: 'What is the real meaning of the Greek word Pita?',
      choice: ['Bread', 'Meal', 'Wrap', 'Food'],
      answer: 0,
      photo:
        'https://www.google.ca/url?sa=i&source=images&cd=&cad=rja&uact=8&ved=2ahUKEwj7kcGtv5rcAhUr54MKHTgqBTUQjRx6BAgBEAU&url=https%3A%2F%2Fwww.myjewishlearning.com%2Frecipe%2Fpita-bread%2F&psig=AOvVaw3mWb34gXZ7FCm7gIXr_2lO&ust=1531516931273826'
    },

    {
      question: 'What is Japanese sake made from?',
      choice: ['Water', 'Potatos', 'Wheat', 'Rice'],
      answer: 3,
      photo:
        'https://www.google.ca/url?sa=i&source=images&cd=&cad=rja&uact=8&ved=2ahUKEwjj3Mr3v5rcAhVk0YMKHQOaDFkQjRx6BAgBEAU&url=https%3A%2F%2Fvinepair.com%2Fwine-blog%2Fmyth-busted-sake-isnt-rice-wine%2F&psig=AOvVaw2CNCgVQqnFQ0jk5jlJMI8i&ust=1531517086971387'
    },

    {
      question: 'What is the most famous beer in Ireland?',
      choice: ['Canadian', 'Heineken', 'Coors light', 'Guiness'],
      answer: 3,
      photo:
        'https://www.google.ca/url?sa=i&source=images&cd=&cad=rja&uact=8&ved=2ahUKEwiuiOPpwJrcAhVI9IMKHfPrA90QjRx6BAgBEAU&url=https%3A%2F%2Fwww.irishcentral.com%2Froots%2Fhistory%2Fguinness-symbol-harp&psig=AOvVaw3qQ58LFLS34Fo1kmUrfy1z&ust=1531517319694715'
    }
  ];

  var correctCount = 0;
  var wrongCount = 0;
  var unanswerCount = 0;
  var timer = 30;
  var intervalId;
  var userGuess = '';
  var running = false;
  var pick;
  var index;
  var newArray = [];
  var holder = [];
  var qCount = option.length;

  $('#reset').hide();
  $('#start').on('click', function() {
    $('#start').hide();
    displayQuestion();
    runTimer();
    for (var i = 0; i < option.length; i++) {
      holder.push(option[i]);
    }
  });

  function runTimer() {
    if (!running) {
      intervalId = setInterval(decrement, 1000);
      running = true;
    }
  }

  function decrement() {
    $('#timeleft').html('<h3>Time remaining:' + timer + '</h3>');
    timer--;

    if (timer === 0) {
      unanswerCount++;
      stop();
      $('#answerblock').html(
        '<p>Time is Up, The correct answer is: ' +
          pick.choice[pick.answer] +
          '</p>'
      );
      hidepicture();
    }
  }

  function stop() {
    running = false;
    clearInterval(intervalId);
  }

  function displayQuestion() {
    index = Math.floor(Math.random() * option.length);
    pick = option[index];

    $('#questionblock').html('<h2>' + pick.question + '</h2>');
    for (var i = 0; i < pick.choice.lenght; i++) {
      var userChoice = $('<div>');
      userChoice.addClass('answerchoice');
      userChoice.html(pick.choice[i]);
      userChoice.attr('data-guessvalse', i);
      $('#answerblock').append(userChoice);
    }
  }

  $('.answerchoice').on('click', function() {
    userGuess = parseInt($(this).attr('data-guessvalue'));
    if (userGuess === pick.answer) {
      correctCount++;
      userGuess = '';
      $('#answerblock').html('<p>Nice!</p>');
      hidepicture();
      stop();
    } else {
      wrongCount++;
      userGuess = '';
      $('#answerblock').html(
        '<p>Sorry, You are wrong, The correct answer is: ' +
          pick.choice[pick.answer] +
          '</P>'
      );
      hidepicture();
      stop();
    }
  });

  function hidepicture() {
    $('#answerblock').append('<img src=' + pick.photo + '</img>');
    newArray.push(pick);
    option.splice(index, 1);

    var hPic = setTimeout(function() {
      $('#answerblock').empty();
      timer = 30;

      if (wrongCount + correctCount + unanswerCount === qCount) {
        $('#questionblock').empty();
        $('#questionblock').html('<h3>Times Up! Here is your result: </h3>');
        $('#answerblock').append('<h3> Correct:' + correctCount + '</3>');
        $('#answerblock').append('<h3> Wrong:' + wrongCount + '</3>');
        $('#answerblock').append('<h3> Unanswer:' + unanswerCount + '</3>');
        $('#reset').show();
        correctCount = 0;
        wrongCount = 0;
        unanswerCount = 0;
      } else {
        runTimer();
        displayQuestion();
      }
    }, 3000);
  }

  $('#reset').on('click', function() {
    $('#reset').hide();
    $('#answerblock').empty();
    $('#questionblock').empty();
    for (var i = 0; i < holder.length; i++) {
      option.push(holder[i]);
    }
    runTimer();
    displayQuestion();
  });
});
