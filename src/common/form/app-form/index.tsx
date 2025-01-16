import {LocationType} from 'components/PlacesAutoCompelete';
import {Formik} from 'formik';

export interface CreateEventValue {
  title: string;
  startTime?: Date;
  endTime?: Date;
  startDate?: Date;
  endDate?: Date;
  desc: string;
  location?: LocationType;
  maxNumber: number;
}

export type InitialValueType = CreateEventValue;

interface Props {
  initialValues: InitialValueType;
  validationSchema: any;
  onSubmit: (values: InitialValueType) => void;
  children: JSX.Element;
}

export const AppForm: React.FC<Props> = ({
  initialValues,
  validationSchema,
  children,
  onSubmit,
}) => {
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}>
      {({}) => <>{children}</>}
    </Formik>
  );
};
