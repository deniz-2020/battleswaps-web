import Image from "next/image";
import { Button } from "@/components/button";
import Link from "next/link";
import Markdown from "react-markdown";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center h-full">
      <h1 className="text-4xl font-bold mb-8">Challenge someone now!</h1>
      <Image
        src="/battleswaps.webp"
        alt="Battleswaps"
        width={500}
        height={500}
      />
      <div>
        <p className="mt-8">
          Battle Swaps is a Uniswap v4 game hook that pools can integrate to
          allow their traders to take part in multiplayer trading competitions
          against each other to win prizes in the form of tokens or NFTs. To win
          a game, players start with the same amount of the same tokens and must
          end up with more of those same tokens than the other player, within a
          specified period of time.{" "}
        </p>
        <br />
        <h2 className="font-bold">How does it work?</h2>
        <p>
          Any trader can open a **battle request** on-chain which can be viewed
          and accepted by other traders. When opening a request, a trader will
          specify following:
        </p>
        <ol>
          <li>- Prize pot share from each player;</li>
          <li>- The pool in which the battle will happen;</li>
          <li>- How long the battle will last;</li>
          <li>- Starting balance of Token 0 and Token 1 for each player;</li>
          <li>
            - Optionally, specify any particular wallet addresses to battle
            with;
          </li>
          <li>
            - Start time of battle, otherwise the battle could also just
            immediately upon being accepted by another trader/player.
          </li>
        </ol>
        <p>
          All battle requests can be seen in a list on a webpage. A list of
          variations of the above can be seen depending on the types of battles
          traders have been requesting. Other traders can view this and accept
          any battle requests they are interested in competing in. A trader may
          send out multiple different requests but they can only have one active
          battle or battle request per pool.
        </p>
        <br />
        <h2 className="font-bold">What is a battle?</h2>
        <p>
          A battle is a time-limited competition played between multiple players
          (for the MVP there will be only 2 participants per battle) where each
          player will begin with a starting balance for Token 0 and Token 1.
          Each player will then competitively increase their balance by making
          as many strategic trades as they can within a specific pool to
          increase their balance as much as possible within a set timeframe.
        </p>
        <p>
          Trades within a pool can go both ways, so Token 0 can be sold for
          Token 1 and vice versa. The final balance of Token 0 and Token 1 for
          each player is converted into a final battle score and the player with
          the higher battle score wins the battle and hence the prize.
        </p>
        <br />
        <h2 className="font-bold">How are battles kept fair?</h2>
        <p>
          To keep things fair, battles will always begin with each player having
          the same amount of each token and can only gain points for trading
          within the pool that was specified in the battle proposal.
        </p>
        <p>
          The hook will keep track of and update the balance of each token for
          each player as swaps occur within the pool. This balance lives within
          the hook and is not to be confused with the actual balance of the
          tokens inside the trader's wallet. The balance within the hook is the
          only thing that will count towards winning the battle. Any swaps that
          exceed the limit of their tracked balance will not collect battle
          points. Although the player will not be prevented from making trades
          that are higher than their in-hook game balance, they will be warned
          in the user-interface that it will not count towards any gains for the
          battle. There is a possible improvement here to allow the trader to
          still gain battle points here but to limit the gains up to the point
          of the existing balance of the player but for the purposes of
          simplicity, we will ignore those swaps to happen with no battle points
          gained.
        </p>
        <br />
        <h2 className="font-bold">How is the battle score calculated?</h2>
        <p>
          Each participant will end the game with some amount of Token 0 and
          Token 1. Given that Token 0 and Token 1 are likely to have different
          values, they will need to be converted into a third representation
          known as a "**battle score**" which will indicate the overall value of
          a player's balances across both tokens. The total battle score will be
          calculated in the following steps:
        </p>
        <ul>
          <li>
            The amount of Token 1 will be converted into that of Token 0 giving
            `Y`;
          </li>
          <li>
            Then the total of Token 0 will be added to `Y` hence giving the
            total battle score.
          </li>
        </ul>
        <p>
          This will be done separately for each player and the player with the
          highest score will be the winner. If both players have exactly the
          same amount of battle points, the prizes will be split into two and
          each player will retrieve the half they deposited before the battle
          began.{" "}
        </p>
        <p>
          Once the set end-time of the battle is up, the hook will unlock
          functionality that allows the retrieval of the prize money for the
          winning participant. The prize money will be locked away until it is
          manually requested by the winning player. Although the winning player
          must manually retrieve their prize money, the website interface can
          still make a query to the blockchain to display who has won the battle
          so they know they really are a winner and their request to retrieve
          their prize money won't fail. It is at this point that the winner is
          calculated and checked before the prize is released.
        </p>
        <br />
        <h2 className="font-bold">What happens once a battle is started</h2>
        <p>
          During battle time, the two (and potentially more post-MVP) players
          will be performing swaps as usual and earning points. Players can
          trade as much as they want within the pool as usual and will earn
          battle points as long as their swap amounts stay within their in-game
          balance. The one that earns the most points at the end of the battle
          will be the prize earner.
        </p>
        <p>
          The battle requester should be notified that their request has been
          accepted by another trader and they can begin trading and earning
          points within the context of the game.
        </p>
        <br />
        <h2 className="font-bold">Things for traders to consider</h2>
        <p>
          Traders will want to think about the types of battle requests they
          want to open. They will want to open requests where the cash prize is
          high enough that in the event they win the battle, they will be making
          more money than the trading and gas fees they spent to win. This could
          be less of an issue when there are many participants that add to the
          pool prize as the more players there are, the bigger the pool prize
          and the more worth it the prize could be, though there will be added
          competition where you'll need to score more than all the other players
          to win.
        </p>
        <br />
        <h2 className="font-bold">Cancelling battles</h2>
        <p>
          If a trader that opened a battle request wants to withdraw their
          request, they can do so as long as another trader has not yet accepted
          to take part in the battle.
        </p>
        <p>
          Players in the middle of an ongoing battle are not able to cancel.
          Post-MVP, this may be allowed and managed by for example, taking
          permission from each player to allow the cancellation and returning
          each player's deposit.
        </p>
        <br />
        <h2 className="font-bold">NFTs for battle use (post-MVP)</h2>
        <p>
          In the future, players should be able to collect consumable items in
          the form of NFTs that will help with their battles by giving them
          "super powers", for example, freezing their opponent from being able
          to make trades for a certain period of time, or even giving them a
          multiplier that will increases their in-hook game balance more than it
          normally would. This could give a more interesting twist that players
          can use to their advantage and make things a bit more unpredictable.
          Players could be limited to selecting a limited number of NFTs they
          can use within a battle. Whether the NFTs used would be public or
          private is a discussion for the future. NFTs should be able to be
          tradable with other traders for a fee they are willing to sell them
          for. This could create an economy of NFT items that could be bought
          and sold. This is potentially a very large topic and can be explored
          further post-MVP.
        </p>
        <br />
        <h2 className="font-bold">How will Battle Swaps be monetised?</h2>
        <p>
          Whenever a battle is won, a small percentage of the winnings will be
          given to the Battle Swap hook. The funds would be used for the further
          development of Battle Swaps.
        </p>
      </div>
      <Button className="text-xl mt-8 mb-8">
        <Link href="/battle">Start Battle</Link>
      </Button>
    </div>
  );
}
