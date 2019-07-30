
#include "/home/arunima/Desktop/liquidAccounts_test/contract/moonlight.hpp"

void moonlight::hello(player_struct payload) {
  auto username = payload.username;
  // Ensure this action is authorized by the player
  require_vaccount(username);
  
  // Create a record in the table if the player doesn't exist in our app yet
 print(username);
   vaccount_test_tab vacc(_self, _self.value);
    vacc.emplace(_self, [&](auto &e) {
        e.id = vacc.available_primary_key();
        e.username = username;
    });
//  print(_self);
//  print(_self.value);
}