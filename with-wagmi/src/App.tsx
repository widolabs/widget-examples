import './App.css'
import { WidoWidget } from 'wido-widget'
import {
  useConnectModal,
} from '@rainbow-me/rainbowkit';
import { useEffect, useMemo, useState } from 'react';
import { getEthersSigner } from './ethers-adapter';
import { providers } from "ethers";
import { useNetwork } from 'wagmi';
import { watchAccount } from 'wagmi/actions';


function App() {
  const [provider, setProvider] = useState<providers.Web3Provider | undefined>();
  const { openConnectModal } = useConnectModal();
  const _unwatch = watchAccount((_) => updateProvider());

  const { chain } = useNetwork();

  const chainId = useMemo(() => {
    return chain?.id;
  }, [chain]);

  useEffect(() => {
    updateProvider();
  }, [chainId]);

  async function updateProvider() {
    const signer = await getEthersSigner({ chainId });
    if (signer?.provider) {
      setProvider(signer?.provider);
    }
  }

  return (
    <div>
      <WidoWidget onConnectWalletClick={openConnectModal} ethProvider={provider} />
    </div>
  )
}

export default App
