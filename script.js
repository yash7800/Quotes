const quoteContainer=document.getElementById('quote-container');
const quoteText=document.getElementById('quote');
const authorText=document.getElementById('author');
const twitterBtn=document.getElementById('twitter');
const newQuoteBtn=document.getElementById('new-quote');
const loader=document.getElementById('loader');

let apiQuotes=[];

//show loading
function showloadingspinner(){
    loader.hidden=false;
    quoteContainer.hidden=true;
    //this means when loader is running we are only going to see loader and nothing else.
}
//hide loading
function removeloadingspinner(){
    quoteContainer.hidden=false;
    loader.hidden=true;
}



//show new quote
function newQuote(){
    showloadingspinner();
    //pick a random quote from apiquotes array
    const quote=apiQuotes[Math.floor(Math.random()*apiQuotes.length)];
    //checking is author field is blank and replace it with word unknown
    if(!quote.author){
        authorText.textContent='unknown';
    }else{
        authorText.textContent=quote.author;
    }

    //check quote length to determine the quote length.
    if(quote.text.length>120){
        quoteText.classList.add('long-quote');//gives smaller font size
    }else{
        quoteText.classList.remove('long-quote');//gives regular font size

    }

    //set quote,hide loader 
    quoteText.textContent=quote.text;
    removeloadingspinner();
}

//get quotes from Api
async function getQuotes(){
    showloadingspinner();
    const apiUrl='https://type.fit/api/quotes';
    try{
        const response=await fetch(apiUrl);
        apiQuotes=await response.json();
        newQuote();

    }catch(error){
        getQuotes();
    }
    

    //to tweet a quote
    function tweetQuote(){
        const twitterUrl=`https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
        window.open(twitterUrl, '_blank')
    }
    newQuoteBtn.addEventListener('click',newQuote);
    twitterBtn.addEventListener('click', tweetQuote);





}
//onload
getQuotes();
