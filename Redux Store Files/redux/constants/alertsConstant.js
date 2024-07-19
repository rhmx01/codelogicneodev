export const SET_ALERTS = 'SET_ALERTS';
export const REMOVE_ALERT = 'REMOVE_ALERT';

export const ALERT_SUCCESS = {
    type: 'success',
    title: 'Opération réussie',
    message: 'L\'opération a été effectuée avec succès.'
};
export const ALERT_INFO = {
    type: 'info',
    title: 'Information importante',
    message: 'Information importante concernant l\'opération. Veuillez lire attentivement et suivre les instructions fournies.'
};
export const ALERT_WARNING = {
    type: 'warning',
    title: 'Avertissement',
    message: 'Il y a des problèmes nécessitant votre attention. Veuillez examiner les détails et prendre les mesures nécessaires.'
};
export const ALERT_ERROR = {
    type: 'error',
    title: 'Erreur survenue',
    message: 'Une erreur s\'est produite lors de l\'opération. Veuillez réessayer ultérieurement.'
};