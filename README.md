
This app is build by React.JS and Tailwind CSS.

We have list of charachters, be default 3 charachters per page

user can navigate through pages, on the firsts page <-button is disabled, and on the last page >-button is disabled.

each charachter has see the details button and onCLick it shows modal the details of the charachter are shown.

Complex data, like (films, species, starships and vehicles) are hidden by default and presented on user action.

Only Problem with this Application is that even though search/filternig functionality works(You can easily
check this by changig constant 'searchTerm' manually - which will filter the results with this function: const filteredCharacters = characters.filter((character) =>
    character.name.toLowerCase().includes(searchTerm.toLowerCase())
  ); - but the thing I couldn't debug(didn't have enought time) is that the input field doesn't work
for some reason, I cannot resolve this problem: this is the input component:
<input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search by name"
        />
but for some reason the onChange doesn't work, so even thoufg filtering functionality works just fine, 
You can't use it, unless you manually change the searchTerm from the code.
