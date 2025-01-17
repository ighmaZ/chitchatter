import { useContext, useEffect, useState } from 'react'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import Divider from '@mui/material/Divider'

import { ShellContext } from 'contexts/ShellContext'
import { StorageContext } from 'contexts/StorageContext'
import { PeerNameDisplay } from 'components/PeerNameDisplay'

import { ConfirmDialog } from '../../components/ConfirmDialog'

interface SettingsProps {
  userId: string
}

export const Settings = ({ userId }: SettingsProps) => {
  const { setTitle } = useContext(ShellContext)
  const { getPersistedStorage } = useContext(StorageContext)
  const [
    isDeleteSettingsConfirmDiaglogOpen,
    setIsDeleteSettingsConfirmDiaglogOpen,
  ] = useState(false)

  const persistedStorage = getPersistedStorage()

  useEffect(() => {
    setTitle('Settings')
  }, [setTitle])

  const handleDeleteSettingsClick = () => {
    setIsDeleteSettingsConfirmDiaglogOpen(true)
  }

  const handleDeleteSettingsCancel = () => {
    setIsDeleteSettingsConfirmDiaglogOpen(false)
  }

  const handleDeleteSettingsConfirm = async () => {
    await persistedStorage.clear()
    window.location.reload()
  }

  return (
    <Box className="max-w-3xl mx-auto p-4">
      <Typography
        variant="h2"
        sx={theme => ({
          fontSize: theme.typography.h3.fontSize,
          fontWeight: theme.typography.fontWeightMedium,
          mb: 2,
        })}
      >
        Data
      </Typography>
      <Typography
        variant="h2"
        sx={theme => ({
          fontSize: theme.typography.h5.fontSize,
          fontWeight: theme.typography.fontWeightMedium,
          mb: 1.5,
        })}
      >
        Delete all settings data
      </Typography>
      <Typography
        variant="body1"
        sx={_theme => ({
          mb: 2,
        })}
      >
        <strong>Be careful with this</strong>. This will cause your user name to
        change from{' '}
        <strong>
          <PeerNameDisplay
            sx={theme => ({
              fontWeight: theme.typography.fontWeightMedium,
            })}
          >
            {userId}
          </PeerNameDisplay>
        </strong>{' '}
        to a new, randomly-assigned name. It will also reset all of your saved
        Chitchatter application preferences.
      </Typography>
      <Button
        variant="outlined"
        color="error"
        sx={_theme => ({
          mb: 2,
        })}
        onClick={handleDeleteSettingsClick}
      >
        Delete all data and restart
      </Button>
      <ConfirmDialog
        isOpen={isDeleteSettingsConfirmDiaglogOpen}
        onCancel={handleDeleteSettingsCancel}
        onConfirm={handleDeleteSettingsConfirm}
      />
      <Typography
        variant="subtitle2"
        sx={_theme => ({
          mb: 2,
        })}
      >
        Chitchatter only stores user preferences and never message content of
        any kind. This preference data is only stored locally on your device and
        not a server.
      </Typography>
      <Divider sx={{ my: 2 }} />
    </Box>
  )
}
