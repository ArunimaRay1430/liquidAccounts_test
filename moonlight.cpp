
#include "/home/arunima/Desktop/liquidAcc_test/moonlight.hpp"

void moonlight::hello(player_struct payload) {
  auto username = payload.username;
  // Ensure this action is authorized by the player
  require_vaccount(username);
  
  // Create a record in the table if the player doesn't exist in our app yet
 print(username);
//  print(_self);
//  print(_self.value);
}