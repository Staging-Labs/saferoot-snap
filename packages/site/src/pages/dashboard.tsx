import React from "react";
import {
  DashboardButtonContainer,
  DashboardCard1,
  DashboardCard2,
  DashboardCardsContainer,
  DashboardNFTTableRoot,
  DashboardRoot,
  DashboardTokensTableRoot,
} from "../components/newComponents/organisms/Dashboard/styles";
import { Button } from "../components/newComponents/atoms/Button";
import { Dimensions } from "../components/newComponents/globalStyles";
import { AssetCard, WalletCard } from "../components/newComponents/molecules";
import { TableView } from "../components/newComponents/molecules/TableView";
import useAssetGuards from "../hooks/Assets/useAssetGuards";
import { navigate } from "gatsby";
import { NAVIGATION_PATHS } from "../constants";
import { ActionType, Page } from "../hooks/actions";
import { useData } from "../hooks/DataContext";
import { EmptyStateContainer } from "../components/EmptyStateContainer";
import { LoaderModal } from "../components/LoaderModal";

const Dashboard = () => {

  const { state, dispatch } = useData();

  const { assetGuards, setAssetGuards, refetch } = useAssetGuards();
  const { ERC20Assets, ERC721Assets } = assetGuards;

  const launchAddAssetsFlow = () => {
    navigate(NAVIGATION_PATHS.ONBOARDING)
    dispatch({ type: ActionType.SET_SELECTED_TAB, payload: Page.Tokens })
    dispatch({ type: ActionType.SET_ASSET_TO_ADD, payload: true })
  };

  const unProtectedERC20s = ERC20Assets.filter((asset) => !asset.isPreGuarded)
  const unProtectedERC721s = ERC721Assets.filter((asset) => !asset.isPreGuarded)
  const hasUnprotectedAssets = (unProtectedERC20s.length + unProtectedERC721s.length) > 0

  return (
    <DashboardRoot>
      <LoaderModal open={state.loader.open} message={state.loader.message} />
      <DashboardCardsContainer>
        <DashboardCard1>
          <WalletCard />
        </DashboardCard1>
        <DashboardCard2>
          {ERC20Assets && ERC721Assets &&
            <AssetCard
              protectedAssets={{ tokens: ERC20Assets.filter((asset) => asset.isPreGuarded).length, nfts: ERC721Assets.filter((asset) => asset.isPreGuarded).length }}
              protectedValue={1500}
            />}
        </DashboardCard2>
      </DashboardCardsContainer>
      <DashboardButtonContainer>
        {hasUnprotectedAssets &&
          <Button image="/add.svg" text="Add Assets to Protect" width={Dimensions.dashboardButtonWidth} border="rounded" onClick={launchAddAssetsFlow} />
        }
      </DashboardButtonContainer>
      <DashboardTokensTableRoot>
        {ERC20Assets.filter((asset) => asset.isPreGuarded)?.length > 0 ? <TableView
          type="token"
          tableHeader={"Tokens"}
          labels={[
            "Token",
            "Balance",
            "Security",
            "Status",
          ]}
          data={ERC20Assets.filter((asset) => asset.isPreGuarded)}
          setData={setAssetGuards}
          buttonOptions={{ edit: true, delete: true }}
          refetch={refetch}
        />
          :
          (unProtectedERC20s.length > 0 && <>
            <EmptyStateContainer message="You have no tokens protected yet." button={
              <Button onClick={launchAddAssetsFlow} text="Add tokens" />
            } />
          </>)
        }
      </DashboardTokensTableRoot>
      <DashboardNFTTableRoot>
        {ERC721Assets.filter((asset) => asset.isPreGuarded)?.length > 0 ? <TableView
          type="nft"
          tableHeader={"NFTs"}
          labels={["NFT", "Collection", "Security", "Status"]}
          data={ERC721Assets.filter((asset) => asset.isPreGuarded)}
          setData={setAssetGuards}
          buttonOptions={{ edit: true, delete: true }}
          refetch={refetch}
        />
          :
          (unProtectedERC721s.length > 0 && <>
            <EmptyStateContainer message="You have no NFTs protected yet." button={
              <Button onClick={launchAddAssetsFlow} text="Add NFTs" />
            } />
          </>)}
      </DashboardNFTTableRoot>
    </DashboardRoot>
  );
};

export default Dashboard;
