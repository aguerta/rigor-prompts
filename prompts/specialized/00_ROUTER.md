# RIGOR — PAPER TYPE & SPECIALIZED AUDIT ROUTER

## Objective

Determine which audit layer should run before loading specialized prompts.

Do not ask the user to classify the paper if the manuscript itself provides enough evidence.

## Step 1 — classify the paper

Assign one or more:

- `EMPIRICAL`
- `THEORETICAL`
- `THEORY_EMPIRICAL`
- `QUALITATIVE`
- `MIXED_METHODS`
- `OTHER`

For empirical work, detect method family:
- RCT
- DID_EVENT_STUDY
- RDD_RKD
- IV_LATE
- SELECTION_ON_OBSERVABLES
- SYNTHETIC_CONTROL
- PANEL_FE_OBSERVATIONAL
- TIME_SERIES_VAR_LP
- STRUCTURAL_MODEL
- PARTIAL_IDENTIFICATION
- CAUSAL_ML
- OTHER_EMPIRICAL

For theoretical work, detect theory family:
- GAME_THEORY
- MECHANISM_DESIGN_INFORMATION_DESIGN
- DYNAMIC_MACRO_GE
- DECISION_INFORMATION_CONTRACT
- MATCHING_MARKET_DESIGN
- OTHER_THEORY

A paper may have multiple active methods.

## Step 2 — route according to user intent

### If user asks for "General Consistency"
- EMPIRICAL -> load `consistency/01_GENERAL_EMPIRICAL.md`
- THEORETICAL -> load `consistency/02_GENERAL_THEORY.md`
- THEORY_EMPIRICAL -> load both plus `consistency/03_THEORY_EMPIRICAL_BRIDGE.md`

### If user asks for specialized consistency
Load general paper-type consistency **plus** the requested method adapter.

Example:
- empirical DiD -> General Empirical + DiD
- empirical RDD -> General Empirical + RDD
- structural -> General Empirical + Structural
- game theory -> General Theory + Game Theory

### If user asks only for Mathematical Consistency
Run the existing general Mathematical Consistency module.
Do not automatically run all method adapters.
However, if the user selected a specialized mathematical audit, the method adapter may add method-specific mathematical checks.

### If user asks only for Statistical Consistency
Run the existing general Statistical Consistency module.
Do not automatically run all method adapters.

### If user asks for Literature
Load:
- `literature/01_GENERAL_EMPIRICAL_LIT.md` or `literature/02_GENERAL_THEORY_LIT.md`
- plus the relevant method-specific literature adapter(s).

## Step 3 — preserve one issue ledger

All prompts write to the same Issue Ledger.

Do not create duplicate root causes.

A specialized finding should attach:
- `METHOD_TRIGGER`
- affected claim(s)
- affected locations
- downstream prose consequence
- implementation dependencies.

## Step 4 — no false specialization

If method classification is uncertain:
- report classification confidence;
- do not pretend a method adapter is applicable;
- fall back to general audit if necessary.

## Output

### PAPER TYPE
### ACTIVE METHOD FAMILIES
### USER-REQUESTED AUDIT TYPE
### PROMPTS LOADED
### ROUTING CONFIDENCE
### ROUTING UNCERTAINTIES
