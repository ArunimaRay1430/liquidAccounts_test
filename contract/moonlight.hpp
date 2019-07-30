#define VACCOUNTS_DELAYED_CLEANUP 120

#include <eosio/eosio.hpp>
#include <eosio/print.hpp>
#include <eosio/asset.hpp>
#include <eosio/transaction.hpp>
#include <eosio/crypto.hpp>
#include <string>
#include "./dist/contracts/eos/dappservices/vaccounts.hpp"
#include "./dist/contracts/eos/dappservices/ipfs.hpp"
#include "./dist/contracts/eos/dappservices/multi_index.hpp"

#define DAPPSERVICES_ACTIONS() \
  XSIGNAL_DAPPSERVICE_ACTION \
  IPFS_DAPPSERVICE_ACTIONS \
  VACCOUNTS_DAPPSERVICE_ACTIONS
#define DAPPSERVICE_ACTIONS_COMMANDS() \
  IPFS_SVC_COMMANDS()VACCOUNTS_SVC_COMMANDS() 
  
#define CONTRACT_NAME() moonlight 


CONTRACT_START()

  
  struct player_struct {
      name username;
      EOSLIB_SERIALIZE( player_struct, (username) )
    };
  
  [[eosio::action]] void hello(player_struct payload);
  
//  [[eosio::action]] void init(dummy_action_hello payload); 
TABLE vaccount_test
  {

    uint64_t id;
    name username;

    uint64_t primary_key() const { return id; }
  };

  typedef eosio::multi_index<"vaccount11"_n, vaccount_test> vaccount_test_tab;

  VACCOUNTS_APPLY(((player_struct)(hello)))
  
CONTRACT_END((hello)(regaccount)(xdcommit))
