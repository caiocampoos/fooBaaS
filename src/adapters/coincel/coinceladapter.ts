import {
  StaticCoincelrCodeCharge,
  StaticQrCodeCharge,
} from '../../modules/baaS/baaS.schema';

export const coincelAdapter = (
  resp: StaticQrCodeCharge,
): StaticCoincelrCodeCharge => ({
  key: resp.key,
  amount: resp.amount,
  transactionIdentification: resp.uniqueIdentifier,
  merchant: {
    postalCode: resp.merchant.postalCode,
    city: resp.merchant.city,
    merchantCategoryCode: resp.merchant.type,
    name: resp.merchant.name,
  },
  tags: undefined,
  additionalInformation: resp.comment,
  withdrawal: false,
});
