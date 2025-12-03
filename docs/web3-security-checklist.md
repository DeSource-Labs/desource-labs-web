# Web3 Security Checklist
### Ship to mainnet with confidence

**Version 1.0** — by DeSource Labs

---

## What This Is

A battle-tested checklist from 50+ blockchain deployments across Ethereum, Solana, TON, Polkadot, and more. We built this to protect your smart contracts, infrastructure, and operations from the most common (and costly) mistakes.

**Who this helps:**  
Product owners planning a token launch, tech leads building dApps, and security teams preparing for audits.

**How to use it:**  
Walk through each section before mainnet. Check off items. Fix gaps. Deploy with clarity.

---

### Core Contracts

- [ ] **Document everything upfront**  
  Public interfaces, upgrade plan, governance model. Write it down before you write code.

- [ ] **Lock down permissions**  
  Role-based access, timelocks on admin changes, multisig for anything that moves money.

- [ ] **Build emergency brakes**  
  Pausable functions, circuit breakers for external calls. You'll thank yourself later.

- [ ] **Prevent reentrancy**  
  Follow checks-effects-interactions pattern. Add `nonReentrant` guards where needed.

- [ ] **Handle math safely**  
  Use Solidity ≥0.8 for overflow checks. Be explicit about decimals and precision.

- [ ] **Trust nothing external**  
  Defensive `try/catch`, gas limits, pull-over-push payments. Minimize your attack surface.

- [ ] **Upgrade with care**  
  If using proxies: protect initializers, diff storage layouts, document upgrade authority.

- [ ] **Emit events for everything**  
  State changes = events. Index fields for monitoring. Never log sensitive data.

- [ ] **Test like production depends on it** (it does)  
  Unit, fuzz, fork tests. Hit 95%+ coverage on critical paths.

- [ ] **Run static analysis**  
  Slither, Mythril, Surya. Fix all high/critical findings before audit.

- [ ] **Get audited**  
  Internal review + external audit for high-value contracts. Track issues to resolution.

- [ ] **Plan your deployment**  
  Verify source code on explorers. Use CREATE2 if you need deterministic addresses. Tag everything.

### Tokenomics (if you're launching a token)

- [ ] **Cap your supply**  
  Hard caps, mint authority constraints, audited vesting schedules.

- [ ] **Set sane limits**  
  Rate limits, max slippage, bounds on user inputs. Protect users from themselves.

- [ ] **Trust multiple oracles**  
  Diversify price feeds. Check for stale data. Have a fallback.

### Front-End & Wallet UX

- [ ] **Make connections clear**  
  Show which chain, handle network mismatches, require explicit approvals.

- [ ] **Readable signatures**  
  Use EIP-712 for human-readable messages. Show risks before users sign.

- [ ] **Block phishing**  
  CSP, Subresource Integrity, HTTPS-only, HSTS. No mixed content, ever.

- [ ] **Never store keys**  
  No private keys in localStorage. Encrypt any session data. Minimal persistence.

### Infrastructure That Doesn't Break

- [ ] **Multiple RPC providers**  
  Primary + fallback. Handle rate limits. Monitor health.

- [ ] **Hardware-backed keys**  
  HSM or hardware wallets for deploy keys. Separate per environment. Rotate regularly.

- [ ] **Vault everything secret**  
  AWS Secrets Manager, HashiCorp Vault, or equivalent. Never in code or logs.

- [ ] **Locked-down CI/CD**  
  Sign artifacts. Protect branches. Require reviews. Make builds reproducible.

- [ ] **Self-hosting nodes?**  
  Know why (archival data? privacy?). Monitor disk and IO. Auto-restart on failure.

- [ ] **Multi-region by default**  
  CDN edges for front-end. Test rollbacks. Blue/green or canary deploys.

- [ ] **Backup like you mean it**  
  ABIs, deployment scripts, DB snapshots. Test restores quarterly.

### Know What's Happening (Before Your Users Do)

- [ ] **Log everything that matters**  
  Structured logs, no PII, immutable storage for audits.

- [ ] **Watch your contracts in real-time**  
  Stream events to monitoring. Track latency, errors, RPC health.

- [ ] **Alert on anomalies**  
  Unexpected balances, paused contracts, infra spikes, error bursts.

- [ ] **Write runbooks now**  
  Playbooks for key compromise, chain halts, oracle failures. Don't improvise in production.

- [ ] **Define on-call**  
  Who responds when? P1 incidents < 30 minutes, P2 < 2 hours.

- [ ] **Prepare your comms**  
  Status page templates, user notices, regulator contacts (if applicable).

### Legal & Compliance

- [ ] **License your code**  
  Align contract and repo licenses. Track third-party dependencies.

- [ ] **Check jurisdiction rules**  
  Token launches may trigger AML/KYC requirements depending on where you operate.

- [ ] **Protect user data**  
  GDPR, CCPA compliance. Appoint a DPO if required.

### Handover (If We Built This For You)

At DeSource Labs, we don't just ship code and disappear. Here's what handover looks like:

- [ ] **Complete deliverables pack**  
  ABIs, addresses, deployment params, env files, architecture diagrams, runbooks.

- [ ] **Knowledge transfer sessions**  
  90-minute technical walkthrough (recorded). Q&A log shared.

- [ ] **Post-launch support**  
  30-day warranty window. Bug fixes in scope. Response times defined.

---

## Before You Ship: Final Checks

- ✅ No critical or high security findings outstanding  
- ✅ Contracts verified on block explorers with published ABIs  
- ✅ Monitoring and alerting live, tested with synthetic events  
- ✅ Rollback path defined and tested on staging  
- ✅ Incident runbooks reviewed and approved  

---

## Need Help?

We've launched 50+ Web3 projects across Ethereum, Solana, TON, Polkadot, and Sui. From NFT marketplaces to cross-chain DEXes, we know where things break — and how to prevent it.

**DeSource Labs**  
Email: [hello@desource-labs.org](mailto:hello@desource-labs.org)  
Telegram: [@desource_labs](https://t.me/desource_labs)  
Web: [desource-labs.org](https://desource-labs.org)

---

*This checklist is provided as guidance. DeSource Labs is not liable for security issues in third-party implementations. For production deployments, consult with security experts and conduct thorough audits.*
