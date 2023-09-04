import styled from "styled-components";
import BookingDataBox from "../../features/bookings/BookingDataBox";

import Row from "../../ui/Row";
import Heading from "../../ui/Heading";
import ButtonGroup from "../../ui/ButtonGroup";
import Button from "../../ui/Button";
import ButtonText from "../../ui/ButtonText";

import { useMoveBack } from "../../hooks/useMoveBack";
import { useBooking } from "../bookings/useBooking";
import Spinner from "../../ui/Spinner";
import { useEffect, useState } from "react";
import Checkbox from "../../ui/Checkbox";
import { formatCurrency } from "../../utils/helpers";
import { useCheckin } from "../bookings/useCheckin";
import { useSettings } from "../settings/useSettings";

const Box = styled.div`
  /* Box */
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);
  padding: 2.4rem 4rem;
`;

function CheckinBooking() {
  const [confirmedPaid, setConfirmedPaid] = useState(false);
  const [addBreakfast, setAddbreakfast] = useState(false);

  const moveBack = useMoveBack();

  const { booking = {}, isLoading } = useBooking();
  const { checkin, isCheckingIn } = useCheckin();
  const { settings = {}, isLoading: isLoadingSettings } = useSettings();
  console.log(booking);
  const {
    id: bookingId,
    guests,
    total,
    numGuests,
    hasBreakfast,
    numNights,
    isPaid,
  } = booking;

  const optionalBreakfastPrice =
    settings.breakfastPrice * numNights * numGuests;
  useEffect(() => {
    setConfirmedPaid(isPaid ? true : false);
  }, [isPaid]);

  console.log(booking);
  function handleCheckin() {
    if (!confirmedPaid) return;
    if (addBreakfast) {
      const breakfast = {
        hasBreakfast: true,
        extraPrice: optionalBreakfastPrice,
        total: total + optionalBreakfastPrice,
      };
      checkin({ bookingId, breakfast });
    } else {
      checkin({ bookingId, breakfast: {} });
    }
  }

  if (isLoading || isLoadingSettings) return <Spinner />;

  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">Check in booking #{bookingId}</Heading>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>

      <BookingDataBox booking={booking} />

      {!hasBreakfast && (
        <Box>
          <Checkbox
            checked={addBreakfast}
            disabled={hasBreakfast}
            onChange={() => {
              setAddbreakfast((s) => !s);
              setConfirmedPaid(false);
            }}
            id="breakfast"
          >
            Want to add addBreakfast for{" "}
            {formatCurrency(optionalBreakfastPrice)}?
          </Checkbox>
        </Box>
      )}

      <Box>
        <Checkbox
          checked={confirmedPaid}
          onChange={() => setConfirmedPaid((s) => !s)}
          id="confirm"
          disabled={confirmedPaid || isCheckingIn}
        >
          I confirm that {guests.fullName} has paid the total amount of{" "}
          {!addBreakfast
            ? formatCurrency(total)
            : formatCurrency(optionalBreakfastPrice + total)}
          .
        </Checkbox>
      </Box>

      <ButtonGroup>
        <Button onClick={handleCheckin} disabled={isCheckingIn}>
          Check in booking #{bookingId}
        </Button>
        <Button variation="secondary" onClick={moveBack}>
          Back
        </Button>
      </ButtonGroup>
    </>
  );
}

export default CheckinBooking;
