import styled from "styled-components";
import { Spacing } from "../../globalStyles";
import { devices } from "../../constants";

export const SafeguardSetupInfoContainer = styled.div`
  width: 80%;
  @media only screen and ${devices.lg} {
    width: 100%;
  }
`;

export const SafeguardSetupTokenContainer = styled.div`
  border-radius: 8px;
  @media only screen and ${devices.lg} {
  }
`;

export const SafeguardSetupNFTContainer = styled.div`
  margin: ${Spacing.GenericSpacerMargin20};
  @media only screen and ${devices.lg} {
  }
`;
