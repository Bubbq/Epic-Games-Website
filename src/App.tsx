import { Grid, GridItem, Show } from "@chakra-ui/react";
import NavBar from "./components/NavBar";
import GameGrid from "./components/GameGrid";
import GenreList from "./components/GenreList";
import { useState } from "react";
import { Genre } from "./hooks/fetchGenres";
import SelectPlatform from "./components/SelectPlatform";
import { Platform } from "./hooks/fetchGames";

export interface GameQuery{//this obj represents all the user choosing stuff passed from their respective components
  genre: Genre | null//the genre selected by the user from GenreList
  platform: Platform | null //the platfrom the user chose in SelectPLatform
}

function App() {
  
const [gameQuery, setGameQuery] = useState<GameQuery>({} as GameQuery)  
  
  return (
    <Grid
      templateAreas={{
        //what our main webpage will look like on different devices, how much area each grid will take depending on the device
        base: `"nav" "main"`, //on mobile, hides the side panel
        lg: `"nav nav " "aside main"`, //on larger devices ( > 1024 px)
      }}
    >
      <GridItem area="nav">
        <NavBar />
        {/*displays game icon top left, and dark mode toggling*/}
      </GridItem>
      <Show above="lg">
        {/*The side panel is only shown when the screen is above 'lg' or greater than 1024px*/}
        <GridItem area="aside" paddingX={3}>
          <GenreList
            onSelectedGenre={(genre) => setGameQuery({...gameQuery, genre})}//first update the gameQuery obj with the new genre
            selectedGenre={gameQuery.genre}//then pass that genre back to genreList for txt bolding and the game grid to filter out the new games
          />
          {/*when the genre is selected, set selected genre to that choice */}
          {/*outputting all the availible genres to the side of the website */}
        </GridItem>
        {/*printing the availble genres to the side */}
      </Show>
      <GridItem area="main">
        <SelectPlatform
          onSelectPlatform={(platform) => setGameQuery({ ...gameQuery, platform})} //first update  the gameQuery's platform, then return it back to SelectPlatform to rename the dropdown menu 
          selectedPlatform={gameQuery.platform}
        />
        <GameGrid
         gameQuery={gameQuery}//pass the user chosen genre and platform to game grid to filter the gameCards out
        />
        {/*where the games are fetched from rawg.io and outputted on main panel */}
      </GridItem>
    </Grid>
  );
}

export default App;
