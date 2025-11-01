## ✅ **Sequential Transaction Flow**

### **Implementation:**

1. **Separate wagmi hooks** for approval and main transaction:
   - `writeApproval` with `isApprovalPending`, `isApprovalSuccess`, `isApprovalError`
   - `writeMainTransaction` with `isMainTxPending`, `isMainTxSuccess`, `isMainTxError`

2. **Sequential execution flow:**
   - **For ETH**: Direct execution of main transaction (no approval needed)
   - **For ERC20 tokens**: Approval first → automatically triggers main transaction upon success

3. **Proper state management:**
   - `isApprovalPending` shows "Approving..." in button
   - `isMainTxPending` shows "Creating Intent..." in button
   - Separate loading states for each transaction phase

4. **useEffect chain for automation:**
   - When approval succeeds → automatically calls `executeMainTransaction()`
   - Proper error handling for both approval and main transaction failures
   - Toast notifications for each step

### **How it works:**

1. **User selects ERC20 token and clicks "Create Intent"**
2. **Step 1**: Shows "Approve [TOKEN] for spending" button
3. **User clicks approve** → MetaMask shows approval transaction
4. **Upon approval success**: Button automatically changes and main transaction triggers
5. **Step 2**: MetaMask shows main transaction for creating the intent
6. **Success**: Both transactions complete sequentially with proper UI feedback
  
  
The sequential transaction flow ensures that:
- **Only one MetaMask popup appears at a time**
- **Approval completes before main transaction**
- **Proper loading states for each phase**
- **Automatic progression from approval to main transaction**